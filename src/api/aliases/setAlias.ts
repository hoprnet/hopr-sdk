import fetch from 'cross-fetch';
import { APIError, getHeaders } from '../../utils';
import { setAliasPayloadType, Error } from '../../types';

/**
 * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
 * Give an address a more memorable alias and use it instead of Hopr address.
 * Aliases are kept locally and are not saved or shared on the network.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to be used for authentication.
 * @param body - A object containing the peer ID and alias to link.
 * @returns A Promise that resolves with void if successful, or an object with the keys "status" and "error" if unsuccessful.
 * @throws An error that occurred while processing the request.
 */
export const setAlias = async (
  url: string,
  apiKey: string,
  body: setAliasPayloadType
): Promise<boolean> => {
  const rawResponse = await fetch(`${url}/api/v2/aliases`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });

  if (rawResponse.status === 201) {
    return true;
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};
