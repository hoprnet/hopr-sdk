import fetch from 'cross-fetch';
import { getHeaders } from '../utils';
import { accountResponse, accountResponseType, Error } from '../../types';
import { APIError } from '../../utils';

/**
 * Gets the HOPR and native addresses associated to the node.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A promise that resolves with an object containing the HOPR and native addresses.
 * @throws An error that occurred while processing the request.
 */
export const getAddresses = async (
  url: string,
  apiKey: string
): Promise<accountResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/account/addresses`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = accountResponse.safeParse(jsonResponse);

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