import { z } from 'zod';
import { ZodToType } from './general';

export const Error = z.object({
  status: z.string().optional(),
  error: z.string().optional()
});

export type ErrorType = ZodToType<typeof Error>;
