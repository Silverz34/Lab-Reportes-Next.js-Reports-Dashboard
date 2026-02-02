import { db } from "./db";
import { topCompradores} from "../interfaces/topcompradores";
import { pagesItems, ClasInventory } from "../interfaces/page";
import { inventarioItems } from "../interfaces/inventarioitem";

export async function getTopBuyers({page, minimo, pageSize = 5}: pagesItems ){
  const offset = (page - 1) * pageSize;

  const query = `
    SELECT * FROM reports_vw_3 
    WHERE gasto_acumulado > $1 
    ORDER BY ranking ASC 
    LIMIT $2 OFFSET $3
  `;

  try {
    const result = await db.query(query, [minimo, pageSize, offset]);
    const rows = result.rows as topCompradores[];
    const totalIngreso= rows.reduce((suma,cliente) =>{
      return suma + Number(cliente.gasto_acumulado);
    },0);
    return {
      data: rows,
      hasMore: rows.length === pageSize, 
      totalVentas: totalIngreso
    };
  } catch (error) {
    console.error('Error en paginación:', error);
    return { data: [], hasMore: false };
  }
}

//esto no es eficiente pero pide un dato defirente 
export async function getStatusInventory({page, status_stock, pageSize = 5}: ClasInventory){
  const offset = (page - 1) * pageSize;

  const queryData = `
    SELECT * FROM reports_vw_4
    ${status_stock ? `WHERE status_stock = $1` : ''} 
    ORDER BY stock_actual ASC
    LIMIT $${status_stock ? '2' : '1'} OFFSET $${status_stock ? '3' : '2'}
  `;

  const queryParams = status_stock 
    ? [status_stock, pageSize, offset] 
    : [pageSize, offset];

  const queryKPI = `
    SELECT COUNT(*) as total_agotados 
    FROM reports_vw_4 
    WHERE status_stock = 'PRECAUCIÓN: BAJO'
  `;
  
  try {
    const [resultData, resultKPI] = await Promise.all([
      db.query(queryData, queryParams),
      db.query(queryKPI)
    ]);

    const rows = resultData.rows as inventarioItems[];
    const totalAgotados = Number(resultKPI.rows[0].total_agotados) || 0;

    return {
      data: rows,
      hasMore: rows.length === pageSize,
      totalAgotados 
    };

  } catch (error) {
    console.error('Error en Inventario:', error);
    return { data: [], hasMore: false, totalAgotados: 0 };
  }

}