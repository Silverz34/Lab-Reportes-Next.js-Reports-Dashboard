import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function Flecha(){
    return(
        <Link href="/" className="flex items-center gap-2 mb-4 text-gray-600 hover:text-black">
            <ArrowLeft size={20} />
            regresar
        </Link>
    );
}