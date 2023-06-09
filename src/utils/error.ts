import { APIErrorResponseType } from '../types';

/**
 * Represents an HOPR API error.
 */
export class APIError extends Error {
  /**
   * The status message associated with the error.
   */
  status: string;

  /**
   * The error message.
   */
  error?: string;

  /**
   * Creates a new instance of the APIError class.
   * @param customError - An object containing custom error properties.
   */
  constructor(customError: APIErrorResponseType) {
    super(customError.error);
    this.name = 'APIError';
    this.status = customError.status;
    this.error = customError.error;
  }
}
