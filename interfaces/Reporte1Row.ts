import {z} from 'zod';

/*export interface reporte1Row{
  estado_orden: string;
  ordenes: number;
  monto_total: number;
  porcentaje: number;
}*/

const reporte1schema= z.object({
 estado_orden: z.string(),
 ordenes: z.number(),
 monto_total : z.number(),
 porcentaje: z.number()
});

export type reporte1Row = z.infer<typeof reporte1schema>;
