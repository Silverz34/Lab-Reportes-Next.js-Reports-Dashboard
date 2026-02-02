import {z} from 'zod';

/*export interface page {
    page: number;
    minimo: number;
    pageSize?: number;
}*/

export const pageschema = z.object({
 page: z.number().positive(),
 pageSize: z.number().positive()
});

export type PageBase = z.infer<typeof pageschema>;

export const pages = pageschema.extend({
    minimo: z.number().positive(),
});

export type pagesItems = z.infer<typeof pages>;

export const clasInventory = pageschema.extend({
    status: z.string(),
});

export type ClasInventory = z.infer<typeof clasInventory>;