--ROLES.SQL 

--por si ya existe el usuario 
DROP ROLE IF EXIST read_user;

-- Crear usuario de la aplicación 
CREATE ROLE read_user WITH 
LOGIN 
PASSWORD 'stack135'
NOSUPERUSER
NOCREATEDB
NOCREATEROLE
INHERIT;

--Permiso basico de conexion 
GRANT USAGE ON SCHEMA public TO readUser;

--Minimos permisos a solo lectura
GRANT SELECT ON reports_vw_1 TO readUser;
GRANT SELECT ON reports_vw_2 TO readUser;
GRANT SELECT ON reports_vw_3 TO readUser;
GRANT SELECT ON reports_vw_4 TO readUser;
GRANT SELECT ON reports_vw_5 TO readUser;

