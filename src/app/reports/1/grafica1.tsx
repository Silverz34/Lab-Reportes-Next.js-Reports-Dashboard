"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Grafica1({data}:{ data: {estado_orden:string, ordenes: number, monto_total: number, porcentaje: number}[] }) {
 return (
   <div className="h-70 w-full bg-white p-10 rounded-lg shadow">
      <h3 className="text-gray-500 text-sm font-medium mb-4">Órdenes por Estado</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="estado_orden" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="ordenes" fill="#005eff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
 );
} 