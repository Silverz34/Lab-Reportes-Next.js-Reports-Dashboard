
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
