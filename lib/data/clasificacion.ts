import { db } from "../db";
import { reporte2Row } from "../../interfaces/reporte2Row";
export async function clasificacion() {
  const result = await db.query('SELECT * FROM reports_vw_2;');
  try {
    return result.rows as reporte2Row[];
  }catch(error){
    console.error('Database Error', error)
    throw new Error('Error al obtener los datos')
  }
}