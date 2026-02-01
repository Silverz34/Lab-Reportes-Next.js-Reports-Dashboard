import {z} from 'zod';

/*export interface reporte2Row{
    categoria: string;
    cantidad_productos: number;
    promedio_precio: number;
    etiqueta_precio: string;
}*/

export const reporte2schema = z.object({
 categoria: z.string(),
 cantidad_productos: z.string(),
 promedio_precio: z.number(),
 etiqueta_precio: z.string()
});

export type reporte2Row = z.infer<typeof reporte2schema>; 
