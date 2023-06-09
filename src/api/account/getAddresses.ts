import { ZodError } from 'zod';
import {
  AccountResponse,
  AccountResponseType,
  BasePayloadType,
  APIErrorResponse
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Gets the HOPR and native addresses associated to the node.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @returns A promise that resolves with an object containing the HOPR and native addresses.
 * @throws An error that occurred while processing the request.
 */
export const getAddresses = async (
  payload: BasePayloadType
): Promise<AccountResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/account/addresses`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = AccountResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
