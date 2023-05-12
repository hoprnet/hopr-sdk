import { ZodType, z } from 'zod';

type ZodToType<T extends ZodType<any, any, any>> = z.infer<T>;

export { ZodToType };
