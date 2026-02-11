import Paginacion from "../../../../components/paginacion";
import { clasInventory } from "../../../../interfaces/page";
import {getStatusInventory} from '../../../../lib/data/status'
import { Flecha } from "../../../../components/flecha";

export const dynamic = 'force-dynamic';

export default async function Report4Page({searchParams}:{searchParams: string}){
   const resolvedParams = await searchParams;
   const params = clasInventory.parse(resolvedParams);
   const {data,hasMore,totalAgotados } = await getStatusInventory({
     page: params.page,
     status_stock: params.status_stock,
     pageSize: params.pageSize
    });
 return(
       <div className="p-8 font-sans text-white-800">
           <Flecha/>
           <h1 className="text-3xl font-bold mb-2">Estatus de articulos</h1>
           <p className="text-gray-600 mb-6">
             Actúa como un sistema de alerta temprana para la operación diaria. 
             Al visualizar productos agotados o con stock bajo, el reporte previene la pérdida de ventas
             y permite coordinar reabastecimientos urgentes,
             asegurando que la tienda nunca deje de ofrecer sus artículos
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                    <p className="text-gray-500 font-medium">productos con status bajo</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{totalAgotados}</p>
                </div>
           </div>
           <br></br>
           <form className="mb-6 flex gap-2 items-end">
                <div>
                    <label className="block text-sm font-bold mb-1">Filtrar Estatus:</label>
                    <select 
                        name="status_stock" 
                        defaultValue={params.status_stock || ""} 
                        className="border border-gray-400 p-2 rounded "
                    >
                        <option className="text-black" value=""> Ver Todos </option>
                        <option className="text-black" value="ALERTA: AGOTADO">ALERTA: AGOTADO</option>
                        <option className="text-black" value="PRECAUCIÓN: BAJO">PRECAUCIÓN: BAJO</option>
                        <option className="text-black" value="Stock Adecuado">Stock Adecuado</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Filtrar
                </button>
            </form>
           <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                    <h3 className="text-lg font-medium text-gray-900">Listado de Productos</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    codigo producto
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nombre del Producto
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock Actual
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estatus
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={4}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                        No se encontraron artículos con ese estatus
                                    </td>
                                </tr>
                            ) : (
                                data.map((row) => {
                                    let colorClass = "bg-gray-100 text-gray-800";
                                    if (row.status_stock === "ALERTA: AGOTADO") {
                                        colorClass = "bg-red-100 text-red-800 border-red-300";
                                    } else if (row.status_stock === "PRECAUCIÓN: BAJO") {
                                        colorClass = "bg-yellow-100 text-yellow-800 border-yellow-300";
                                    } else if (row.status_stock === "Stock Adecuado") {
                                        colorClass = "bg-green-100 text-green-800 border-green-300";
                                    }
                                    return (
                                        <tr key={row.codigo_producto}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {row.codigo_producto}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {row.producto}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                                {row.stock_actual} u.
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <span
                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}
                                                >
                                                    {row.status_stock}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
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