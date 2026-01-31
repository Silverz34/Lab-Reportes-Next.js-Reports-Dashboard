/*
REPORTE 2: Clasificacion de precios
Qué devuelve: categorias de productos segun si son "caras" o "baratas"
Grain (una fila representa): ID de categoria
Métrica(s): ROUND(AVG(precio), 2) promedio del precio, etiqueta de precio.
Por qué GROUP BY / HAVING / subconsulta: GROUP BY para sacar promedios. 
CASE para colocar etiquetas de texto.
*/
-- VIEW
CREATE OR REPLACE VIEW reports_vw_2 AS
    SELECT c.nombre AS categoria,
        COUNT(p.id) AS cantidad_productos,
        ROUND(AVG(precio),2) AS promedio_precio,
        CASE 
            WHEN AVG(precio) > 50 THEN 'Caro'
            ELSE 'Barato'
        END AS etiqueta_precio
    FROM productos p 
    JOIN categorias c ON p.categoria_id = c.id
    GROUP BY c.nombre;

-- VERIFY: 
SELECT SUM(cantidad_productos) FROM reports_vw_2;

