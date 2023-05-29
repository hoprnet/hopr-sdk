import {
  AccountResponse,
  AccountResponseType,
  BasePayloadType,
  Error
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Fetches the HOPR and native balances of the node.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @returns A Promise that resolves with an object containing the HOPR and native balances.
 * @throws An error that occurred while processing the request.
 */
export const getBalances = async (
  payload: BasePayloadType
): Promise<AccountResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/account/balances`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
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
