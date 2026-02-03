
## DASHBOARD E-COMMERCE BASICO 
Esta practica se trata de una pagina que funciona como reportes sobre una base de datos desarrollada con **Next.js** y **PostgreSQL**.
El propósito de esta práctica es experimentar con views e índices en PostgreSQL dentro de un entorno Docker, aplicándolos a un sistema de reportes construido con Next.js para analizar y optimizar el acceso a los datos.

### Stack Tecnológico 
* **Frontend/Framework:** Next.js 15 (App Router).
* **Base de Datos:** PostgreSQL (Dockerizado).
* **Validación de Datos:** Zod (Esquemas estrictos para URL params y tipos).
* **Visualización:** Recharts (Gráficos interactivos).
* **Estilos:** Tailwind CSS.
* **Lenguaje:** TypeScript.

## Instalacion y Despliegue 
Este proyecto está contenerizado para facilitar su despliegue.
Utiliza **Docker Compose** para orquestar tanto la aplicación (Frontend/Backend en Next.js) como la base de datos (PostgreSQL) simultáneamente.

### 1. Prerrequsisito 
* Tener instalado [Docker Desktop](https://www.docker.com/).
* Gitbash.
### 2. clona el repositorio 
```bash
git clone <TU_URL_DEL_REPO>
cd <NOMBRE_DE_TU_CARPETA>
```
### entrar al proyecto 
 Desde Git Bash buscas el directorio donde clonaste el repositorio para luego moverte dentro del proyecto, dentro puedes confirmar que se encuentra el archivo **docker-compose.yml**
 ```bash
 cd ReportDashboard
 ls 
 ```
### levantar el contenedor
ejecuta el siguiente comando para levantar el contenedor 
 ```bash
 docker-compose up --build
 ```
### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz copiando el ejemplo:
```bash
cp .env.example .env
```
(Asegúrate de que las credenciales en .env coincidan con las definidas en docker-compose.yml)

### Mostrar Dashboard 
Una vez que la consola muestre que los servicios están listos:
Frontend/Dashboard: Abre http://localhost:3000
Base de Datos: Accesible en puerto 5432 (interno).

## Analisis del Proceso y Arquietctura 
El sistema sigue una arquitectura Server-Side First para garantizar rensimiento y consistencia de datos:

1.Las consultas complejas (agregaciones, promedios, filtros) se resuelven a nivel de Base de Datosmediante **SQL Views** optimizadas con **índices**.
Las **views** no almacenan datos ni **índices**, pero su rendimiento depende de los índices existentes en las tablas que consultan. Al indexar columnas usadas en filtros, joins o agrupaciones, las views se ejecutan más rápido y mejoran el desempeño del dashboard.

2. Antes de hacer cualquier consulta, la aplicacion utiliza **Zod**para validar los parámetros de la URL (paginacion, filtros).Se implemento de métodos defensivos como .catch() y .default(). Si un usuario manipula la URL ingresando valores inválidos (ej. ?page=texto o ?minimo=-50), el sistema no colapsa (Error 500).

3. Se uso renderizado hibrido: **Server Components** para la logica de negocios y obtencion de datos (data.ts) y **Cliente Components** seutiliza estrictamente para interactividad (Graficos de Reachrts. dropdowns de filtro)

## Defensa de la Arquitectura y Decisiones Tecnicas.
A continuacion se justifica el diseño del sistema bajo algunas reglas que se tinen para la creacion de esta practica.

### Estrategia de Base de Datos (SQL Views)
Se optó por delegar la lógica compleja a la base de datos mediante Vistas (Views) en lugar de procesar datos en JavaScript. Esto reduce la latencia de red (se transfieren solo los datos finales) y centraliza la lógica de negocio.

* Uso de CTEs (Common Table Expressions): Implementado en el Reporte 5.
* Justificación: Se utilizó un CTE para calcular el "Promedio Global" una sola vez y reutilizarlo para filtrar las categorías. Esto hace la consulta más legible y evita subconsultas repetitivas.

* Window Functions: Implementadas en el Reporte 3 (Ranking de Clientes).
* Justificación: Se usó RANK() o ROW_NUMBER() para generar la posición del cliente basada en su gasto total. Esto permite paginar el ranking de manera eficiente sin recalcular toda la tabla en cada página.

* Lógica Condicional (CASE/COALESCE):
* Justificación: Se utilizaron para manejar valores nulos en precios o stocks y para crear categorías legibles ("Caro/Barato" o Semáforos) directamente desde SQL, simplificando el frontend.

### Optimización y Rendimiento (Indexes)
Para garantizar tiempos de respuesta rápidos, se implementó una estrategia de indexación en **db/indexes.sql**:

* Índices en Foreign Keys: Se crearon índices en las columnas de unión (categoria_id, orden_id) para optimizar los JOINs entre tablas grandes.

* Índices de Filtrado: Se añadieron índices en columnas de estado (status_stock, estado_orden) para acelerar los filtros WHERE utilizados en los Reportes 1 y 4.

* Defensa: Sin estos índices, la base de datos tendría que realizar "Sequential Scans" (leer toda la tabla). Con los índices, se fuerza un "Index Scan", reduciendo la complejidad de búsqueda de O(n) a O(log n).

### Seguridad y Principio de Menor Privilegio (Roles)
Siguiendo las mejores prácticas de seguridad, la aplicación NO se conecta como superusuario (postgres).
Rol de Aplicación (read_user): Se creó un rol específico en db/roles.sql.

* Permisos Granulares: Este usuario tiene permisos GRANT SELECT únicamente sobre las Vistas, no sobre las tablas base.
* Defensa: Si la aplicación Next.js fuera comprometida, el atacante no podría realizar operaciones destructivas (DROP, DELETE, INSERT) ni leer datos crudos que no estén expuestos explícitamente en las vistas.

