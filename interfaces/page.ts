import {z} from 'zod';

export const pageschema = z.object({
 page: z.coerce.number().positive().min(1).default(1),
 pageSize: z.coerce.number().positive().default(5)
});

export type PageBase = z.infer<typeof pageschema>;

export const pages = pageschema.extend({
   minimo: z.coerce.number().positive().default(100)
});

export type pagesItems = z.infer<typeof pages>;

export const clasInventory = pageschema.extend({
    status_stock: z.enum(['ALERTA: AGOTADO', 'PRECAUCIÓN: BAJO', 'Stock Adecuado'])
        .optional()
        .catch(undefined)
});

export type ClasInventory = z.infer<typeof clasInventory>;