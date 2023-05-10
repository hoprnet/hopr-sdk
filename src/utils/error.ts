import { ErrorType } from '../types';

export class APIError extends Error {
  status?: string;
  error?: string;

  constructor(customError: ErrorType) {
    super(customError.error);
    this.name = 'APIError';
    this.status = customError.status;
    this.error = customError.error;
  }
}
