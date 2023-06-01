import { z } from 'zod';

export const Error = z.object({
  status: z.string().optional(),
  error: z.string().optional()
});

export type ErrorType = z.infer<typeof Error>;
