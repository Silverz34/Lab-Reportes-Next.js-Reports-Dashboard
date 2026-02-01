import {z} from 'zod';
/*export interface topCompradores{
  ranking: number;
  cliente: string;
  correo: string;
  total_ordenes: number;
  gasto_acumulado: number;
}*/

export const topComSchema = z.object({
 ranking: z.number(),
 cliente: z.string(),
 correo: z.string().email(),
 total_ordenes: z.number().positive(),
 gasto_acumulado: z.number().positive()
});

export type topCompradores = z.infer <typeof topComSchema>; 