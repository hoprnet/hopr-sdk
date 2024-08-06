import { z } from 'zod';
import { ApiErrorResponse, ApiErrorResponseType } from '../types';

const SdkApiErrorResponse = z.object({
  status: z.number(),
  statusText: z.string(),
  hoprdErrorPayload: ApiErrorResponse.optional(),
  description: z.string().optional()
});

type SdkApiErrorResponseType = z.infer<typeof SdkApiErrorResponse>;

/**
 * Represents an HOPR SDK API error.
 */
export class sdkApiError extends Error {
  /**
   * The status code associated with the error
   */
  status: number;

  /**
   * The status message associated with the error.
   */
  statusText: string;

  /**
   * Error Object
   */
  hoprdErrorPayload?: ApiErrorResponseType;

  /**
   * Descriton of the error
   */
  description?: string;

  /**
   * Creates a new instance of the APIError class.
   * @param customError - An object containing custom error properties.
   */
  constructor(customError: SdkApiErrorResponseType) {
    super(customError.statusText);
    this.name = 'APIError';
    this.status = customError.status;
    this.statusText = customError.statusText;
    this.hoprdErrorPayload = customError.hoprdErrorPayload;
    this.description = `HTTP Status code ${customError.status}`;
    if (customError.hoprdErrorPayload?.status)
      this.description = customError.hoprdErrorPayload.status;
    else if (customError.hoprdErrorPayload?.error)
      this.description = customError.hoprdErrorPayload.error;
  }
}
