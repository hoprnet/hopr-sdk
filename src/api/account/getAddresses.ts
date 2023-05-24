import {
  AccountResponse,
  AccountResponseType,
  ExtendedBasicPayloadType,
  Error
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Gets the HOPR and native addresses associated to the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A promise that resolves with an object containing the HOPR and native addresses.
 * @throws An error that occurred while processing the request.
 */
export const getAddresses = async (
  payload: ExtendedBasicPayloadType
): Promise<AccountResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/account/addresses`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = AccountResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
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
