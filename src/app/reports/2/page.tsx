import { db } from "../../../../lib/db";
import Link from "next/link";

interface Reporte2Row{
    categoria_id: number;
    cantidad_productos: number;
    promedio_precio: number;
    etiqueta_precio: string;
}

export default async function Report2Page() {
    const result = await db.query('SELECT * FROM reports_vw_2;');
    const data: Reporte2Row[] = result.rows;
    const sumaPromedios = data.reduce((acc, curr) => acc + Number(curr.promedio_precio), 0);
    const kpiPromedio = data.length > 0 ? (sumaPromedios / data.length).toFixed(2) : 0;
    
 return( 
        <div>
            <h1>Report 2</h1>
        </div>
    );
} 