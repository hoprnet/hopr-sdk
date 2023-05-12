import { ErrorType } from '../types/error.js';
import 'zod';
import '../types/general.js';

declare class APIError extends Error {
    status?: string;
    error?: string;
    constructor(customError: ErrorType);
}

export { APIError };
