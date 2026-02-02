import {z} from 'zod';
export const reporte1schema= z.object({
 estado_orden: z.string(),
 ordenes: z.number(),
 monto_total : z.number(),
 porcentaje: z.number()
});

export type reporte1Row = z.infer<typeof reporte1schema>;
