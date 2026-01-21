import { ZodError } from 'zod';
import {
  GetBalancesResponseType,
  GetBalancesResponse,
  BasePayloadType,
  ApiErrorResponse
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

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
): Promise<GetBalancesResponseType> => {
  const url = new URL(`api/v4/account/balances`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status !== 200) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  const jsonResponse = await rawResponse.json();

  const currencies = Object.keys(jsonResponse);
  jsonResponse.token =
    jsonResponse?.safeHoprAllowance &&
    jsonResponse.safeHoprAllowance.includes(' ')
      ? jsonResponse.safeHoprAllowance.split(' ')[1]
      : null;

  for (let i = 0; i < currencies.length; i++) {
    const token = currencies[i] as string;
    jsonResponse[token] = jsonResponse[`${currencies[i]}`].includes(' ')
      ? jsonResponse[token].split(' ')[0]
      : jsonResponse[token];
  }

  const parsedRes = GetBalancesResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the response and it is unexpected
  throw parsedRes.error;
};
