import { db } from "../../../../lib/db";
import { Flecha } from "../../../../components/flecha";
import { reporte2Row } from "../../../../interfaces/reporte2Row";

export const dynamic = 'force-dynamic';

export default async function Report2Page() {
    const result = await db.query('SELECT * FROM reports_vw_2;');
    const data: reporte2Row[] = result.rows;
    const sumaPromedios = data.reduce((acc, curr) => acc + Number(curr.promedio_precio), 0);
    const kpiPromedio = data.length > 0 ? (sumaPromedios / data.length).toFixed(2) : 0;

 return( 
    <div className="p-8 space-y-8 min-h-screen">
        <Flecha/>
        <h1 className="text-3xl font-bold mb-2">Reporte de clasificacion de articulos</h1>
        <p className="text-gray-600 mb-6">
           Clasifica cada categoría según si sus productos son más caros o más baratos en promedio. 
           Te permite ver de un vistazo qué categorías manejan precios altos y cuáles son más económicas, 
           ayudándote a ajustar tu estrategia de precios o promociones futuras por categoria (departamento)
        </p>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                <p className="text-gray-500 font-medium">Precio Promedio Global</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{kpiPromedio}%</p>
          </div>
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
             <h3 className="font-semibold text-gray-700">Detalle por Categoría</h3>
            </div>
            <table className="w-full border-collapse border border-gray-300 bg-gray-100 text-black">
                <thead>
                    <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                    <th className="px-6 py-4">ID Categoría</th>
                    <th className="px-6 py-4">Productos en Catálogo</th>
                    <th className="px-6 py-4">Precio Promedio</th>
                    <th className="px-6 py-4">Clasificación</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {data.map((row) => (
                    <tr key={row.categoria} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">
                        {row.categoria}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                        {row.cantidad_productos} unidades
                        </td>
                        <td className="px-6 py-4 font-mono text-gray-700">
                        ${Number(row.promedio_precio).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                            ${row.etiqueta_precio === 'Caro' 
                            ? 'bg-red-50 text-red-700 border-red-200' 
                            : 'bg-green-50 text-green-700 border-green-200'
                            }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                            ${row.etiqueta_precio === 'Caro' ? 'bg-red-500' : 'bg-green-500'}`}>
                            </span>
                            {row.etiqueta_precio}
                        </span>
                        </td>
                    </tr>
                    ))}
                    {data.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                          No se encontraron datos en la vista.
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
      </div>
       </div>
    );
} 