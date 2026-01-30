/*
REPORTE 1: clientes tacaños
Qué devuelve: una lista de clientes cuyo gasto es bajo < $500
Grain (una fila representa): un usuario
Métrica(s): SUM(o.total) gasto acomulado, COUNT(o.id) cantidad de ordenes.
Por qué GROUP BY / HAVING / subconsulta: HAVING para filtrar grupos clientes.
CASE para colocar etiquetas de texto.
*/
-- VIEW
CREATE OR REPLACE VIEW reports_vw_3 AS
    SELECT u.nombre AS cliente,
    u.email AS correo,
        COUNT(o.id) AS total_ordenes,
        SUM(o.total) AS gasto_acumulado
    FROM usuarios u
    JOIN ordenes o ON u.id = o.usuario_id
    GROUP BY U.id, u.nombre, u.email
    HAVING SUM(o.total) < 500;

-- VERIFY: 
SELECT * FROM reports_vw_3 ORDER BY gasto_acumulado ASC;

-- VERIFY:
