/*
REPORTE 4: semaforo de inventario
Qué devuelve:lista de productos que rebastecer
Grain (una fila representa): un producto
Métrica(s): p.stock, etiqueta de accion. 
Por qué GROUP BY / HAVING / subconsulta: No usa SELECT *.
CASE para clasificar niveles de stock.
*/
-- VIEW
CREATE OR REPLACE VIEW reports_vw_4 AS
    SELECT p.codigo AS codigo_producto,
        p.nombre AS producto,
        p.stock AS stock_actual,
        CASE 
            WHEN p.stock = 0 THEN 'ALERTA: AGOTADO'
            WHEN p.stock BETWEEN 10 AND 50 THEN 'PRECAUCIÓN: BAJO'
            ELSE 'Stock Adecuado'
        END AS status_stock
    FROM productos p
    GROUP BY p.id, p.codigo, p.nombre, p.stock;

-- VERIFY: 
SELECT * FROM reports_vw_4 WHERE accion_recomendada LIKE 'ALERTA%';

-- VERIFY:
