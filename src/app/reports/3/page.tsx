import Paginacion from "../../../../components/paginacion";
import { getTopBuyers } from "../../../../lib/data";
import { Flecha } from "../../../../components/flecha";
import { pages } from "../../../../interfaces/page"

export default async function Report3Page({searchParams}: {searchParams : string}) {
    const params = pages.parse(searchParams);
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
             descrpccion lo dejare al final 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                    <p className="text-gray-500 font-medium">nnsnjs</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{totalVentas}</p>
                </div>
           </div>
           <br></br>
            <div className="bg-white rounded shadow overflow-hidden mb-4">
                <table className="min-w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-500">Ranking</th>
                            <th className="px-6 py-3 text-left text-gray-500">Cliente</th>
                            <th className="px-6 py-3 text-left text-gray-500">Correo</th>
                            <th className="px-6 py-3 text-left text-gray-500">total de ordenes</th>
                            <th className="px-6 py-3 text-left text-gray-500">Gasto Total</th>
                        </tr>
                    </thead>
                    <tbody>
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
            <Paginacion 
                totalPage={params.page} 
                MoreData={hasMore} 
            />
        </div>
    );
}