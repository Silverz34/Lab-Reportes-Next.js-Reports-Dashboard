/*
REPORTE 5: 
Qué devuelve:
Grain (una fila representa): 
Métrica(s): 
Por qué GROUP BY / HAVING / subconsulta: 

*/
-- VIEW
CREATE OR REPLACE VIEW reports_vw_5 AS
    WITH promedio_inventario AS(
        SELECT AVG(stock) AS stock_promedio FROM productos
    )
    SELECT c.nombre AS categoria,
        COUNT(p.id) AS cantidad_productos,
        SUM(p.stock) AS total_unidades,
        ROUND((SELECT stock_promedio FROM promedio_inventario),0) AS promedio
    FROM categorias c
    JOIN productos p ON c.id = p.categoria_id
    GROUP BY c.id, c.nombre;
    HAVING AVG(p.stock) < (SELECT stock_promedio FROM promedio_inventario);

-- VERIFY: 
SELECT * FROM reports_vw_5;
-- VERIFY:
