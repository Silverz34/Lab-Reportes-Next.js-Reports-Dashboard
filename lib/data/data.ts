import { db } from "../db";
import { topCompradores} from "../../interfaces/topcompradores";
import { pagesItems} from "../../interfaces/page";
import { density } from "../../interfaces/densidad";

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



//otra mas no afecta 
export async function getDensity(){
  const queryData = `
    SELECT * FROM reports_vw_5 
    ORDER BY total_unidades DESC
    LIMIT 50
  `;

  const queryKPI = `
    SELECT categoria, total_unidades 
    FROM reports_vw_5 
    ORDER BY total_unidades DESC 
    LIMIT 1
  `;

  try {
    const [resultData, resultKPI] = await Promise.all([
      db.query(queryData),
      db.query(queryKPI)
    ]);

    const rows = resultData.rows as density[];
    const topCategory = resultKPI.rows[0] || { categoria: 'N/A', total_unidades: 0 };

    return {
      data: rows,
      kpi: {
        nombre: topCategory.categoria,
        cantidad: Number(topCategory.total_unidades)
      }
    };

  } catch (error) {
    console.error('Error en Reporte 5:', error);
    return { data: [], kpi: { nombre: 'Error', cantidad: 0 } };
  }

}