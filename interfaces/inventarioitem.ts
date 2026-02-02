import {z} from 'zod';

export const invetSchema = z.object({
 codigo_producto : z.string(),
 producto : z.string(),
 stock_actual: z.number().positive(),
 status_stock: z.string()
});

export type inventarioItems = z.infer<typeof invetSchema>;
