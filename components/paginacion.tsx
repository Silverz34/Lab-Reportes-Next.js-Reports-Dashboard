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
        <div className="flex justify-center mt-8 space-x-4"></div>
    );
}
