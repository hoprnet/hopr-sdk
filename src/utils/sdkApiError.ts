import { z } from 'zod';


const SdkApiErrorResponse = z.object({
  httpStatus: z.number(),
  statusText: z.string(),
  error: z.string().optional()
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
   * The error message.
   */
  error?: string;

  /**
   * Creates a new instance of the APIError class.
   * @param customError - An object containing custom error properties.
   */
  constructor(customError: SdkApiErrorResponseType) {
    super(customError.error);
    this.name = 'SDK API Error';
    this.status = customError.httpStatus;
    this.statusText = customError.statusText;
    this.error = customError.error ? customError.error : `HTTP Status ${customError.httpStatus}`;
  }
}

