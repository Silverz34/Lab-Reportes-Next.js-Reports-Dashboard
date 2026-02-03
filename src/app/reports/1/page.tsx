import { db } from "../../../../lib/db";
import Grafica1 from "./grafica1";
import { reporte1Row } from "../../../../interfaces/reporte1Row";
import { Flecha } from "../../../../components/flecha";

export const dynamic = 'force-dynamic';

export default async function Report1Page() {
  const resultado = await db.query('SELECT * FROM reports_vw_1;');
  const data: reporte1Row[] = resultado.rows;

  const totalPorcentaje = data.reduce((acc, curr) => acc + Number(curr.porcentaje), 0);
  const kpiPromedio = data.length > 0 ? (totalPorcentaje / data.length).toFixed(2) : 0;

  return (
   <div className="p-8 space-y-8 min-h-screen">
      <Flecha/>
      <h1 className="text-3xl font-bold mb-2">Reporte de estatus de orden</h1>
      <p className="text-gray-600 mb-6">
        Este reporte identifica cuellos de botella en la cadena de suministro al mostrar
        en que etapa se concentra el capital. Un alto porcentaje de ordenes pendientes indica fallas 
        en la etapa de entregas, mientras que las entregas exitosas validan la eficiencia.
      </p>
      <br></br>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
            <p className="text-gray-500 font-medium">Cumplimiento Global (Promedio)</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{kpiPromedio}%</p>
          </div>
           <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
            <p className="text-gray-500 font-medium">total de porcentaje</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{totalPorcentaje}%</p>
          </div>
        </div>
    <Grafica1 data={data} />
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Detalle por Estatus</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Órdenes (Cant)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">porcentaje</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.estado_orden}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.estado_orden}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.ordenes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${Number(row.monto_total).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    Number(row.porcentaje) > 20 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {row.porcentaje}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   </div>
 );
}