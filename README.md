
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
 Desde Git Bash buscas el directorio donde clonaste el repositorio para luego moverte dentro del proyecto
 ```bash
 cd ReportDashboard
 ```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la raíz copiando el ejemplo:
```bash
cp .env-example 
```
(Asegúrate de que las credenciales en .env coincidan con las definidas en docker-compose.yml)


### levantar el contenedor
Una vez dentro del directorio que conntiene el proyecto puedes confirmar que se encuentra el archivo **docker-compose.yml**
```bash
 ls 
 ```
ejecuta el siguiente comando para levantar el contenedor 
 ```bash
 docker-compose up --build
 ```

### Mostrar Dashboard 
Una vez que la consola muestre que los servicios están listos:
Frontend/Dashboard: Abre http://localhost:3000
Base de Datos: Accesible en puerto 5432 (interno).

## Analizis de desicion tecnica DB 

###  Uso de Indices

#### idx_ordenes_total
* **Se usa en** : reports_vw_3 
* **jsutificacion** :
En esta vista se ordene los resultados por SUM(total) DESC para calcular RANK, al indexar la columna numérica total, la base de datos puede acceder a los valores ya ordenados o calcular la suma mas eficientemente. 

#### idx_ordenes_total
* **Se usa en** : reports_vw_3 
* **jsutificacion** :
En esta vista se ordene los resultados por SUM(total) DESC para calcular RANK, al indexar la columna numérica total, la base de datos puede acceder a los valores ya ordenados o calcular la suma mas eficientemente. 


## Trade-offs: SQL vs NEXT.js 

* **logica de Clasificacion**:

**SQL**
Se delego la responsabilidad a la base de datos la logica de negocio para determinar el estado textual. las vistas **reports_vw_4** y **reports_vw_2** usan CASE WHEN para devolver strings de estados como : 'ALERTA: AGOTADO' y 'Caro'

**NEXT**
la capa del cliente solo muestra estas etiquetas de clasificacion de un color con la intencion meramente visual. 

**¿Por qué?** : 
Si las reglas de negocio cambian (ej. el stock bajo pasa de 10 a 15), solo se actualiza la vista en BD, sin necesidad de recompilar el frontend ni buscar lógica dispersa en componentes de React.

* **Cálculo de totales en paginación**:

**NEXT(Server-side)**:
En 'getTopBuyers', el calculo del totalIngreso se realiza utilizando '.reduce()' sobre el array de filas obtenido. 

**¿Por qué?** : 
En este reporte para la kpi, se hizo la suma unicamente de los valores visibles en la pagina actual, evitando una segunda consulta de agregacio a la base que podria ser costos.

* **Paginacion Hibrida**:

**NEXT Y SQL**:
Next gestiona los parametros de estado  (page, pagesize) para la paginacion de los resultados de los datos, pero la ejecucuion real de los cortes de datos se hacen en SQL mediante LIMIT y OFFSET. 

**¿Por qué?** : 
En un hipoteticos caso donde se tengan que transferir  muchos registros a la memoria de Node.js para luego hacer un 'array.slice()' seria ineficiente por lo que la base de datos es mucho mas rápida descartando filas antes de enviarlas por la red. 

* **Filtrado dinamico**:

**SQL**:
En lugar de usar lógica condicional en el lado del cliente para armar 'strings' de SQL diferentes según el filtro (lo cual es riesgoso y no permitido en la actividad), se optiene una sola consulta estática y parametrizada 'WHERE ($1::text IS NULL OR status_stock = $1)' en status.ts.

**¿Por qué?** : 
Garantiza la seguridad contra SQL injection ya que el comando nunca cambia. La consulta es ligeramente mas compleja de leer pero delega eficientemente la decisión del filtrado al motor de la base de datos. 

