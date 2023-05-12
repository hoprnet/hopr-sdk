import { z } from 'zod';
import { ZodToType } from './general.js';

declare const Error: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: string | undefined;
    error?: string | undefined;
}, {
    status?: string | undefined;
    error?: string | undefined;
}>;
type ErrorType = ZodToType<typeof Error>;

export { Error, ErrorType };
