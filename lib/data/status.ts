import { db } from "../db";
import { inventarioItems } from "../../interfaces/inventarioitem";
import { ClasInventory } from "../../interfaces/page";


export async function getStatusInventory({page, status_stock, pageSize = 5}: ClasInventory){
  const offset = (page - 1) * pageSize;

  const queryData = `
    SELECT * FROM reports_vw_4
    WHERE ($1::text IS NULL OR status_stock = $1)
    ORDER BY stock_actual DESC
    LIMIT $2 OFFSET $3
  `;

  const queryParams = [
   status_stock , 
   pageSize,
   offset
  ]
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