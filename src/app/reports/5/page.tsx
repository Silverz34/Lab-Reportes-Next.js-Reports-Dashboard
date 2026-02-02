import Grafica2 from "./grafica5";
import { Flecha } from "../../../../components/flecha";
import {getDensity} from "../../../../lib/data"

export default async function Report5Page() {
    const {data, kpi} = await getDensity();
 return( 
        <div className="p-8 font-sans text-white-800">
                   <Flecha/>
                   <h1 className="text-3xl font-bold mb-2">Estatus de articulos</h1>
                   <p className="text-gray-600 mb-6">
                     descrpccion lo dejare al final 
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        <div className="bg-white p-6 rounded-lg shadow border-l-4">
                            <p className="text-gray-500 font-medium">productos con status bajo</p>
                            <div className="flex gap-4 items-baseline">
                                <p className="text-4xl font-bold text-gray-900">{kpi.nombre}</p>
                                <p className="text-4xl font-bold text-gray-900">{kpi.cantidad}</p>
                            </div>
                        </div>
                   </div>
                   <br></br>
                   <div className="mb-8">
                     <Grafica2 data={data}/>
                   </div>
                   <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800">Detalle por Categoría</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Volumen Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">cantidad</th>
                                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio Promedio</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {row.categoria}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center">
                                            <span className="font-bold text-blue-600 w-12">{row.total_unidades}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                        {row.cantidad_productos}
                                    </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                        ${Number(row.promedio_global).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}