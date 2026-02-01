--ROLES.SQL 

--por si ya existe el usuario 
DROP ROLE IF EXISTS read_user;

-- Crear usuario de la aplicación 
CREATE ROLE read_user WITH 
LOGIN 
PASSWORD 'stack135'
NOSUPERUSER
NOCREATEDB
NOCREATEROLE
INHERIT;

--Permiso basico de conexion 
GRANT USAGE ON SCHEMA public TO read_user;

--Minimos permisos a solo lectura
GRANT SELECT ON reports_vw_1 TO read_user;
GRANT SELECT ON reports_vw_2 TO read_user;
GRANT SELECT ON reports_vw_3 TO read_user;
GRANT SELECT ON reports_vw_4 TO read_user;
GRANT SELECT ON reports_vw_5 TO read_user;

