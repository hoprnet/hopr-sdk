import {
  Error,
  RemoveBasicAuthenticationPayloadType,
  SetAliasPayloadType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
 * Give an address a more memorable alias and use it instead of Hopr address.
 * Aliases are kept locally and are not saved or shared on the network.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @param body - A object containing the peer ID and alias to link.
 * @returns A Promise that resolves to true if alias successfully linked to peerId.
 * @throws An error that occurred while processing the request.
 */
export const setAlias = async (
  payload: SetAliasPayloadType
): Promise<boolean> => {
  const body: RemoveBasicAuthenticationPayloadType<SetAliasPayloadType> = {
    alias: payload.alias,
    peerId: payload.peerId
  };
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/aliases`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

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
