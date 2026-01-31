import Card from "../../components/cards";
export default function Home() {
  const reports = [
    { id: 1, title: 'Reporte de Ventas', description: 'Resumen de las ventas mensuales.', link: '/reports/sales' },
    { id: 2, title: 'Reporte de Usuarios', description: 'Análisis del crecimiento de usuarios.', link: '/reports/users' },
    { id: 3, title: 'Reporte de Rendimiento', description: 'Evaluación del rendimiento del sistema.', link: '/reports/performance' },
  ];
  return (
    <div className="p-6"> 
      <section className="mb-8"> 
      <h1 className="text-2xl font-bold mb-2">Dashboard de Reportes</h1>
      <p className="text-gray-600"> xxxxxx</p> 
      </section>

      <section> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"> 
          {reports.map((report) => ( <Card key={report.id} report={report} /> ))} 
        </div> 
      </section> 
    </div>
  );
}
