import fetch from 'cross-fetch';
import { APIError, getHeaders } from '../../utils';
import { Error, getTokenResponse, getTokenResponseType } from '../../types';

/**
 * Get the full token information for the token used in authentication.
 *
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
 * @returns A Promise that resolves to an object with the token info.
 * @throws An error that occurred while processing the request.
 */
export const getToken = async (
  url: string,
  apiKey: string
): Promise<getTokenResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/token`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  if (rawResponse.status === 404) {
    // 404 The specified resource was not found
    throw new APIError({ status: 'RESOURCE WAS NOT FOUND' });
  }
  const jsonResponse = await rawResponse.json();
  const parsedRes = getTokenResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    return parsedRes.data;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    throw new APIError(Error.parse(jsonResponse));
  }
};
