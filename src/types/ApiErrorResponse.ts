import { z } from 'zod';

export const ApiErrorResponse = z.object({
  status: z.string(),
  error: z.string().optional()
});

export type ApiErrorResponseType = z.infer<typeof ApiErrorResponse>;
