import { getAddresses } from './getAddresses';

/**
 * Get the native address of the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves with the native address if successful, or an object with the keys "status" and "error" if unsuccessful.
 */
export const getNativeAddress = async (
  url: string,
  apiKey: string
): Promise<string | { status: string; error: string }> => {
  const addresses = await getAddresses(url, apiKey);
  if ('native' in addresses) return addresses['native'];
  return { status: addresses['status']!, error: addresses['error']! };
};
