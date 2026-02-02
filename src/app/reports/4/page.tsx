import Paginacion from "../../../../components/paginacion";
import { clasInventory } from "../../../../interfaces/page";
import { getStatusInventory} from '../../../../lib/data'
import { Flecha } from "../../../../components/flecha";

export default async function Report4Page({searchParams}:{searchParams: string}){
   const params = clasInventory.parse(searchParams);
   const {data,hasMore,  totalAgotados } = await getStatusInventory({
    page: params.page,
     status_stock: params.status_stock,
     pageSize: params.pageSize
    });
 return(
       <div className="p-8 font-sans text-white-800">
           <Flecha/>
           <h1 className="text-3xl font-bold mb-2">Estatus de articulos</h1>
           <p className="text-gray-600 mb-6">
             descrpccion lo dejare al final 
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 ">
                    <p className="text-gray-500 font-medium">nnsnjs</p>
                    <p className="text-4xl font-bold text-gray-900 mt-2">{totalAgotados}</p>
                </div>
           </div>
           <form className="mb-6 flex gap-2 items-end">
                <div>
                    <label className="block text-sm font-bold mb-1">Filtrar Estatus:</label>
                    <select 
                        name="estatus" 
                        defaultValue={params.status_stock || ""} 
                        className="border border-gray-400 p-2 rounded "
                    >
                        <option className="text-black" value="">-- Ver Todos --</option>
                        <option className="text-black" value="ALERTA: AGOTADO">ALERTA: AGOTADO</option>
                        <option className="text-black" value="ALERTA: Stock Bajo">PRECAUCION: Stock Bajo</option>
                        <option className="text-black" value="Stock Adecuado">Stock Adecuado</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Filtrar
                </button>
            </form>
       </div> 
       
      
    );
}