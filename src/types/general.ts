import { ZodType, z } from 'zod';

export type ZodToType<T extends ZodType<any, any, any>> = z.infer<T>;
