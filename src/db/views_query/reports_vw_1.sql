/*
REPORTE 1: Reporte mensual de estatus ordenes
Qué devuelve: filtrado de error o cancelacion  
Grain (una fila representa): un estatus de orden 
Métrica(s): COUNT(*) ordenes, SUM(total) monto total, % cumplimiento.
Por qué GROUP BY / HAVING / subconsulta: GROUP BY por sttatus de orden;
HAVING descarta grupos pequeños o irrelevantes.
*/
-- VIEW
CREATE OR REPLACE VIEW reports_vw_1 AS
    SELECT status AS estado_orden,
        COUNT(*) AS ordenes,
        SUM(total) AS monto_total,
        ROUND((COUNT(*)::numeric / (SELECTCOUNT(*)FROM ordenes)*100),2) AS porcentaje
    FROM ordenes 
    GROUP BY status
    HAVING COUNT(*) >=1;

-- VERIFY: 
SELECT SUM(ordenes) FROM reports_vw_1;

-- VERIFY:
