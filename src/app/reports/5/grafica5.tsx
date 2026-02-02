"use client";

import {ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

interface ChartProps {
  data: {
   categoria: string;
   total_unidades: number; 
   promedio_global: number;
  }[];
}

export default function Grafica2({ data }: ChartProps) {
  const cleanData = data.map(item => ({
    ...item,
    total_unidades: Number(item.total_unidades) || 0,
    promedio_global: Number(item.promedio_global) || 0,
  }));

  return (
    <div className="h-[450px] w-full bg-white p-4 rounded-lg shadow border border-gray-100">
      <h3 className="text-gray-800 font-bold mb-6 text-center text-lg">Comparativa: Stock vs Precio Promedio</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={cleanData} 
          margin={{ top: 20, right: 30, bottom: 40, left: 20 }} 
        >
          <CartesianGrid stroke="#f0f0f0" vertical={false} />
          <XAxis 
            dataKey="categoria" 
            scale="band"
            tickLine={false} 
            tick={{ fontSize: 11, fill: '#666' }}
          />
          <YAxis 
            yAxisId="left" 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            label={{ value: 'Unidades (Stock)', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 12 }} 
          />
          <YAxis 
            yAxisId="right" 
            orientation="right"
            domain={['auto', 'auto']} 
            tickFormatter={(value) => `$${value}`} 
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12, fill: '#ef4444' }} 
            label={{ value: 'Precio Promedio ($)', angle: 90, position: 'insideRight', fill: '#ef4444', fontSize: 12 }} 
          />
          <Tooltip 
            cursor={{ fill: '#f9fafb' }}
            formatter={(value, name) => {
               if (name === 'Precio Promedio') return [`$${Number(value).toFixed(2)}`, name];
               return [value, name];
            }}
          />
          <Legend verticalAlign="top" height={36}/>
          <Bar 
            yAxisId="left" 
            dataKey="total_unidades" 
            name="Stock Total" 
            barSize={32} 
            fill="#3b82f6" 
            radius={[6, 6, 0, 0]} 
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="promedio_global" 
            name="Precio Promedio" 
            stroke="#ef4444" 
            strokeWidth={4} 
            dot={{ r: 5, fill: '#ef4444', strokeWidth: 2, stroke: 'white' }} 
            activeDot={{ r: 8 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}