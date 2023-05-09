import fetch from 'cross-fetch';
import { getHeaders } from '../../utils';

/**
 * Signs a message given using the node’s private key. Prefixes messsage with “HOPR Signed Message: ” before signing.
 *
 * @param url - The base URL for the API.
 * @param apiKey - The API key to use for authentication.
 * @param message - The message to sign.
 * @returns A Promise that resolves to a string representing the signature or an object containing a status and error message.
 */
const sign = async (
  url: string,
  apiKey: string,
  message: string
): Promise<string | { status: string; error: string }> => {
  const res = await fetch(`${url}messages/sign`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify({ message: message })
  });

  const signatureResponse = (await res.json()) as {
    signature?: string;
    status?: string;
    error?: string;
  };

  if (signatureResponse['signature']) return signatureResponse['signature'];
  return {
    status: signatureResponse['status']!,
    error: signatureResponse['error']!
  };
};
