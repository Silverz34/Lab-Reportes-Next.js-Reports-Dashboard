import { db } from "../../../../lib/db";
import Grafica1 from "./grafica1";

interface Reporte1Row{
    estado_orden: string;
    ordenes: number;
    monto_total: number;
    porcentaje: number;
  }

export default async function Report1Page() {
  const resultado = await db.query('SELECT * FROM reports_vw_1;');
  const data: Reporte1Row[] = resultado.rows;

  return (
        <div className="justify-items-start m-12">
          <h1 className="text-3xl font-bold mb-2">Reporte de estatus de orden</h1>
          <p className="text-gray-600 mb-6">
           descrpccion lo dejare al final 
          </p>
        </div>
     );
}