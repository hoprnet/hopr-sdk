import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  BasePayloadType,
  Error,
  GetTokenResponse,
  GetTokenResponseType
} from '../../types';

/**
 * Get the full token information for the token used in authentication.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @returns A Promise that resolves to an object with the token info.
 * @throws An error that occurred while processing the request.
 */
export const getToken = async (
  payload: BasePayloadType
): Promise<GetTokenResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/token`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  if (rawResponse.status === 404) {
    // 404 The specified resource was not found
    throw new APIError({ status: 'RESOURCE WAS NOT FOUND' });
  }
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetTokenResponse.safeParse(jsonResponse);
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
