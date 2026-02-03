import Paginacion from "../../../../components/paginacion";
import { getTopBuyers } from "../../../../lib/data";
import { Flecha } from "../../../../components/flecha";
import { pages } from "../../../../interfaces/page"

export const dynamic = 'force-dynamic';

export default async function Report3Page({searchParams}: {searchParams : string}) {
    const resolvedParams = await searchParams;
    const params = pages.parse(resolvedParams);
    const {data, hasMore, totalVentas} = await getTopBuyers({
        page: params.page,
        minimo: params.minimo,
        pageSize: 5
    });
    
 return( 
        <div className="p-8">
            <Flecha/>
            <h1 className="text-3xl font-bold mb-2">Reporte de mejores compradores</h1>
            <p className="text-gray-600 mb-6">
                Muestra qué clientes aportan más dinero al negocio, ordenándolos en un ranking.  
                Esto permite ver rápidamente quiénes son los que realmente impulsan las ventas para en un futuro promocionar 
                beneficios/recompensas, ayuda mucho a las campañas de marketing. 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                    <p className="text-gray-500 font-medium">nnsnjs</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{totalVentas}</p>
                </div>
           </div>
           <br></br>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-gray-500">Ranking</th>
                                <th className="px-6 py-3 text-left text-gray-500">Cliente</th>
                                <th className="px-6 py-3 text-left text-gray-500">Correo</th>
                                <th className="px-6 py-3 text-left text-gray-500">total de ordenes</th>
                                <th className="px-6 py-3 text-left text-gray-500">Gasto Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((cliente) => (
                                <tr key={cliente.ranking} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 text-black">{cliente.ranking}</td>
                                    <td className="px-6 py-4 text-black">{cliente.cliente}</td> 
                                    <td className="px-6 py-4 text-black">{cliente.correo}</td> 
                                    <td className="px-6 py-4 text-black">{cliente.total_ordenes}</td> 
                                    <td className="px-6 py-4 text-black">${cliente.gasto_acumulado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    <Paginacion 
                        totalPage={params.page} 
                        MoreData={hasMore} 
                    />
                </div>
            </div>
        </div>
    );
}