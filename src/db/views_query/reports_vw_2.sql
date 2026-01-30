/*
REPORTE 1: Clasificacion de precios
Qué devuelve: categorias de productos segun si son "caras" o "baratas"
Grain (una fila representa): ID de categoria
Métrica(s): ROUND(AVG(precio), 2) promedio del precio, etiqueta de precio.
Por qué GROUP BY / HAVING / subconsulta: GROUP BY para sacar promedios. 
CASE para colocar etiquetas de texto.
*/
-- VIEW
CREATE OR REPLACE VIEW reports_vw_2 AS
    SELECT categoria_id,
        COUNT(*) AS cantidad_productos,
        ROUND(AVG(precio),2) AS promedio_precio,
        CASE 
            WHEN AVG(precio) > 50 THEN 'Cara'
            ELSE 'Barata'
        END AS etiqueta_precio
    FROM productos
    GROUP BY status

-- VERIFY: 
SELECT * FROM reports_vw_2;

-- VERIFY:
