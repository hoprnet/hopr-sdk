/**
 * Get the native address of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to the native address.
 * @throws An error that occurred while processing the request.
 */
declare const getNativeAddress: (url: string, apiKey: string) => Promise<string>;

export { getNativeAddress };
