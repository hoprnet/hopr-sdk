import { z } from 'zod';

export const APIErrorResponse = z.object({
  status: z.string(),
  error: z.string().optional()
});

export type APIErrorResponseType = z.infer<typeof APIErrorResponse>;
