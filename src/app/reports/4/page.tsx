import Paginacion from "../../../../components/paginacion";
import { clasInventory } from "../../../../interfaces/page";
import { getStatusInventory} from '../../../../lib/data'
import { Flecha } from "../../../../components/flecha";

export default async function Report4Page({searchParams}:{searchParams: string}){
   const params = clasInventory.parse(searchParams);
   const {data,hasMore,  totalAgotados } = await getStatusInventory({
    page: params.page,
     estatus: params.estatus,
     pageSize: params.pageSize
    });
 return(
       <div>
           <Flecha/>
           <h1 className="text-3xl font-bold mb-2">Reporte de mejores compradores</h1>
           <p className="text-gray-600 mb-6">
             descrpccion lo dejare al final 
            </p>
       </div> 
      
    );
}