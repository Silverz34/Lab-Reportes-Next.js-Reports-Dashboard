-- ============================================
-- VERIFY.SQL - Validación automática
-- ============================================

\echo '------------------------------------'
\echo 'INICIANDO VERIFICACIÓN DE LA BASE DE DATOS'
\echo '------------------------------------'

-- 1. VERIFICAR TABLAS Y DATOS (Semilla)
-- Usamos bloques anónimos (DO) para lanzar errores si los conteos son 0
DO $$
DECLARE
    cnt_usuarios integer;
    cnt_productos integer;
    cnt_ordenes integer;
BEGIN
    SELECT count(*) INTO cnt_usuarios FROM usuarios;
    SELECT count(*) INTO cnt_productos FROM productos;
    SELECT count(*) INTO cnt_ordenes FROM ordenes;

    -- Assertions (Si la condición es falsa, detiene el script)
    ASSERT cnt_usuarios >= 6, '❌ Error: Faltan usuarios en el seed';
    ASSERT cnt_productos >= 10, '❌ Error: Faltan productos en el seed';
    ASSERT cnt_ordenes >= 5, '❌ Error: Faltan ordenes en el seed';
    
    RAISE NOTICE '✅ Tablas Base: OK (Usuarios: %, Productos: %, Ordenes: %)', cnt_usuarios, cnt_productos, cnt_ordenes;
END $$;

-- 2. VERIFICAR VISTAS (Lógica de Negocio)
-- Verificamos que las vistas no estén vacías y retornen las columnas esperadas

\echo '\n--- Verificando Vistas ---'

-- Verify View 1
DO $$
DECLARE v_count integer;
BEGIN
    SELECT count(*) INTO v_count FROM reports_vw_1;
    ASSERT v_count > 0, '❌ Error: reports_vw_1 está vacía';
    RAISE NOTICE '✅ reports_vw_1 (Status): OK';
END $$;

-- Verify View 3 (Top Compradores - Lógica > 500)
DO $$
DECLARE v_check integer;
BEGIN
    -- Verificar que solo traiga compras mayores a 500 (según tu WHERE)
    SELECT count(*) INTO v_check FROM reports_vw_3 WHERE gasto_acumulado <= 500;
    ASSERT v_check = 0, '❌ Error: reports_vw_3 está trayendo montos menores a 500';
    RAISE NOTICE '✅ reports_vw_3 (Top Compradores): OK';
END $$;

-- Verify View 4 (Semaforo - Stock)
DO $$
DECLARE v_alerta text;
BEGIN
    -- Verificar que la lógica del CASE funciona (buscamos un agotado o bajo)
    SELECT status_stock INTO v_alerta FROM reports_vw_4 LIMIT 1;
    ASSERT v_alerta IS NOT NULL, '❌ Error: reports_vw_4 devuelve nulos';
    RAISE NOTICE '✅ reports_vw_4 (Inventario): OK';
END $$;

-- 3. VERIFICAR ÍNDICES
-- Consultamos el catálogo del sistema (pg_indexes)

\echo '\n--- Verificando Índices ---'
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename IN ('ordenes', 'productos') 
AND indexname LIKE 'idx_%';

-- 4. VERIFICAR ROLES Y PERMISOS
-- Consultamos information_schema para ver si read_user tiene acceso

\echo '\n--- Verificando Permisos de read_user ---'
SELECT grantee, table_name, privilege_type
FROM information_schema.table_privileges
WHERE grantee = 'read_user'
AND table_name LIKE 'reports_vw_%';

\echo '------------------------------------'
\echo '✅ VERIFICACIÓN COMPLETADA EXITOSAMENTE'
\echo '------------------------------------'

