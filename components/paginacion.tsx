"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface paginacionProps{
    totalPage: number;
    MoreData: number;
} 

export default function Paginacion({totalPage, MoreData}:paginacionProps){

    return(
        <div className="flex justify-center mt-8 space-x-4"></div>
    );
}
