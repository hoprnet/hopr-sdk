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
  const url = new URL(`api/v3/account/balances`, payload.apiEndpoint);
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

  // remove currency names from strings
  const currencies = Object.keys(jsonResponse);
  let parsedResNoCurrency = {};
  for (let i = 0; i < currencies.length; i++) {
    //@ts-ignore
    parsedResNoCurrency[`${currencies[i]}`] = jsonResponse[
      `${currencies[i]}`
    ].includes(' ')
      ? jsonResponse[`${currencies[i]}`].split(' ')[0]
      : jsonResponse[`${currencies[i]}`];
  }

  const parsedRes = GetBalancesResponse.safeParse(parsedResNoCurrency);

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
  throw new ZodError(parsedRes.error.issues);
};
