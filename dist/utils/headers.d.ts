import { Headers } from 'cross-fetch';

/**
 * Generates the headers needed for making API requests.
 *
 * @param apiKey - The API key to include in the headers.
 * @returns The headers for making API requests.
 */
declare const getHeaders: (apiKey: string) => Headers;
declare const _default: {};

export { _default as default, getHeaders };
