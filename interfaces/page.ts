import {z} from 'zod';

/*export interface page {
    page: number;
    minimo: number;
    pageSize?: number;
}*/

export const pageschema = z.object({
 page: z.number(),
 minimo : z.number(),
 pageSize: z.number()
});

export type Page = z.infer<typeof pageschema>;