import { db } from "../db";
import { density } from "../../interfaces/densidad";


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