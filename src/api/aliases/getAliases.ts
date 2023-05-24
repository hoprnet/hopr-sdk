import {
  ExtendedBasicPayloadType,
  Error,
  GetAliasesResponse,
  GetAliasesResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Get all aliases you set previously and their corresponding peer IDs.
 *
 * @param url - The base URL of the server.
 * @param apiKey - The API key to use for authentication.
 * @returns An object with alias names as keys and the peerId associated with the alias.
 * @throws An error that occurred while processing the request.
 */
export const getAliases = async (
  payload: ExtendedBasicPayloadType
): Promise<GetAliasesResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/aliases`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetAliasesResponse.safeParse(jsonResponse);

  if (parsedRes.success && rawResponse.status === 200) {
    return parsedRes.data;
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
