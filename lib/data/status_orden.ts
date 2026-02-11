import { db } from "../db";
import { reporte1Row } from "../../interfaces/reporte1Row";

export async function ordenStatus(){
    const result = await db.query('SELECT * FROM reports_vw_1;')

    try{
        return result.rows as reporte1Row[]; 
    }catch(error){
        console.error('Database Error', error)
        throw new Error('Error al obtener los datos')
    }
}