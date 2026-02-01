"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface paginacionProps{
  totalPage: number;
  MoreData: number;
} 

export default function Paginacion({totalPage, MoreData}:paginacionProps){
    const router = useRouter();
    const search = useSearchParams();
    const navigation = (direction: 'antes' | 'despues') => {    
        const params = new URLSearchParams(search.toString());
        const newPage = direction === 'despues'? totalPage + 1 : totalPage -1;
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`); 
    };

    return(
        <div className="flex items-center gap-4 mt-6 p-4 border-t border-gray-200">
      <span className="text-sm text-gray-500">
        Página actual: <span className="font-bold text-gray-900">{totalPage}</span>
      </span>
      
      <div className="flex gap-2">
        <button
          onClick={() => navigation('antes')}
          disabled={totalPage <= 1}
          className="px-4 py-2 text-sm border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={() => navigation('despues')}
          disabled={!MoreData}
          className="px-4 py-2 text-sm border rounded bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </div>
    );
}
