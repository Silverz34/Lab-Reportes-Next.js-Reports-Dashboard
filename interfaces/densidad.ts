import {z} from 'zod';

export const densitySchema = z.object ({
    categoria: z.string(),
    cantidad_productos: z.number().positive(),
    total_unidades: z.number().positive(),
    promedio_global: z.number().positive()
});

export type density = z.infer <typeof densitySchema>