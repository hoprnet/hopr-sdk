import fetch from 'cross-fetch';
import {
  Error,
  RemoveBasicAuthenticationPayloadType,
  SetAliasPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

/**
 * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
 * Give an address a more memorable alias and use it instead of Hopr address.
 * Aliases are kept locally and are not saved or shared on the network.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to be used for authentication.
 * @param body - A object containing the peer ID and alias to link.
 * @returns A Promise that resolves to true if alias succesfully linked to peerId.
 * @throws An error that occurred while processing the request.
 */
export const setAlias = async (
  payload: SetAliasPayloadType
): Promise<boolean> => {
  const body: RemoveBasicAuthenticationPayloadType<SetAliasPayloadType> = {
    alias: payload.alias,
    peerId: payload.peerId
  };
  const rawResponse = await fetch(`${payload.url}/api/v2/aliases`, {
    method: 'POST',
    headers: getHeaders(payload.apiKey),
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
