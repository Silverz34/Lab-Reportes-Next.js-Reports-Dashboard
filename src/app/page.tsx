import Card from "../../components/cards";
export default function Home() {
  const reports = [
    { id: 1, title: 'Reporte de status orden', description: 'Resumen de cancelacion de ordenes', link: '/reports/1' },
    { id: 2, title: 'Clasificacion de precios', description: 'categorias de productos segun si son "caras" o "baratas"', link: '/reports/2' },
    { id: 3, title: 'Top compradores', description: 'suarios que han realizado mas compras', link: '/reports/3'},
    { id: 4, title: 'semaforo de inventario', description: 'productos con stock minimo', link: '/reports/4'},
    { id: 5, title: 'Volumen de productos', description: ' Identifica las categorías que tienen más unidades físicas en bodega que el promedio.', link: '/reports/5'},
  ];
  return (
    <div className="p-6 m-12"> 
      <section className="mb-8"> 
      <p className="text-gray-600">
        Este dashboard presenta una práctica de generación de views y 
        reportes para un sistema de e‑commerce. Aquí se resumen indicadores de 
        desempeño (KPIs) y análisis de datos sencillos. 
      </p> 
      </section>
      <br></br>
      <section> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"> 
          {reports.map((report) => ( <Card key={report.id} report={report}/> ))} 
        </div> 
      </section> 
    </div>
  );
}
