import Paginacion from "../../../../components/paginacion";
import {z} from "zod";
//import Link from "next/link";
import { getTopBuyers } from "../../../../lib/data";

const searchSchema = z.object({
 minimo: z.coerce.number().positive().optional().default(100),
 page: z.coerce.number().min(1).optional().default(1)
});

export default async function Report3Page({searchParams}: {searchParams : string}) {
    const params = searchSchema.parse(searchParams);
    const {data, hasMore} = await getTopBuyers({
        page: params.page,
        minimo: params.minimo,
        pageSize: 10
    });
 return( 
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-2">Reporte de estatus de orden</h1>
            <p className="text-gray-600 mb-6">
             descrpccion lo dejare al final 
            </p>
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