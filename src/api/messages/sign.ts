import fetch from 'cross-fetch';
import { APIError, getHeaders } from '../../utils';
import { signPayloadType, signResponse, Error } from '../../types';

/**
 * Signs a message given using the node’s private key. Prefixes messsage with “HOPR Signed Message: ” before signing.
 *
 * @param url - The base URL for the API.
 * @param apiKey - The API key to use for authentication.
 * @param body - An object containing the message to sign.
 * @returns A Promise that resolves to a string representing the signature.
 * @throws An error that occurred while processing the request.
 */
export const sign = async (
  url: string,
  apiKey: string,
  body: signPayloadType
): Promise<string> => {
  const rawResponse = await fetch(`${url}/api/v2/messages/sign`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = signResponse.safeParse(jsonResponse);

  if (rawResponse.status === 200 && parsedRes.success) {
    return parsedRes.data.signature;
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    throw new APIError(Error.parse(jsonResponse));
  }
};
