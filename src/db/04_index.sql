--INDEX.SQL _OPTIMIZACION DE CONSULTAS 

--1: indice para VIEW 3 (Top compradores)
--Ayuda: calcula SUM(total)y el RANK mas rapido
CREATE INDEX idx_ordenes_total ON ordenes(total);

--2: indice para VIEW 2 (Precios) y VIEW 5 (inventario)
--Ayuda: aceleralas funciones de AVG(precio) 
CREATE INDEX idx_productos_precio ON productos(precio);

--3: indice para VIEW 4 (semaforo) y VIEW 5 (densidad)
--Ayuda: filtra rapido CASE (stock < 10 ) y AVG(stock). 
CREATE INDEX idx_productos_stock ON productos(stock);

-- VERIFICACION (EXPLAIN)
EXPLAIN ANALYZE SELECT * FROM reports_vw_3;
EXPLAIN ANALYZE SELECT * FROM reports_vw_4;