import Link from 'next/link';

export default function Card({ report }: { report: { id: number; title: string; description: string; link: string }}) {
    return(
        <div className="bg-blue-600 shadow-md rounded-lg p-4 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">{report.title}</h2> 
          <p className="text-slate-950 mb-4">{report.description}</p> 
          <Link href={report.link} className="text-white-600 hover:underline">
            Ver reporte 
          </Link>
        </div>
    );
}