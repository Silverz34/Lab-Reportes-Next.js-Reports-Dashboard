import {z} from 'zod';

export const invetSchema = z.object({
 codigo_producto : z.string(),
 producto : z.string(),
 stock_actual: z.number().positive(),
 status_strock: z.string()
});

export type inventarioItems = z.Infer<typeof invetSchema>;
