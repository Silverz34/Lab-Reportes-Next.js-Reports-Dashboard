import {z} from 'zod';
export const topComSchema = z.object({
 ranking: z.number(),
 cliente: z.string(),
 correo: z.string().email(),
 total_ordenes: z.number().positive(),
 gasto_acumulado: z.number().positive()
});

export type topCompradores = z.infer <typeof topComSchema>; 