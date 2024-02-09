import { ZodError } from 'zod';
import {
  GetBalancesResponseType,
  GetBalancesResponse,
  BasePayloadType,
  APIErrorResponse
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
): Promise<GetBalancesResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v3/account/balances`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
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
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
