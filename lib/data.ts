import { db } from "./db";
import { topCompradores} from "../interfaces/topcompradores";
import { Page } from "../interfaces/page";

export async function getTopBuyers({page, minimo, pageSize = 10}: Page){
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

    return {
      data: rows,
      hasMore: rows.length === pageSize 
    };

  } catch (error) {
    console.error('Error en paginación:', error);
    return { data: [], hasMore: false };
  }
}