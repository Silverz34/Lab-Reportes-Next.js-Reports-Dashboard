/*
REPORTE 3: Top compradores
Qué devuelve: ranking de quien gasto más
Grain (una fila representa): un usuario
Métrica(s): SUM(o.total) gasto acomulado, COUNT(o.id) cantidad de ordenes.
Por qué GROUP BY / HAVING / subconsulta: HAVING para filtrar grupos clientes.
RANK para clasificar los clientes por gasto.
*/
-- VIEW
CREATE OR REPLACE VIEW reports_vw_3 AS
    SELECT u.nombre AS cliente,
    u.email AS correo,
        COUNT(o.id) AS total_ordenes,
        SUM(o.total) AS gasto_acumulado,
        RANK() OVER (ORDER BY SUM(o.total) DESC) AS ranking
    FROM usuarios u
    JOIN ordenes o ON u.id = o.usuario_id
    GROUP BY U.id, u.nombre, u.email
    HAVING SUM(o.total) > 500;

-- VERIFY: 
SELECT * FROM reports_vw_3 LIMIT 3;

-- VERIFY:
EXPLAIN SELECT * FROM reports_vw_3;