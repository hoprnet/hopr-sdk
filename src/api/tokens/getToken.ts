import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  ApiErrorResponse,
  BasePayloadType,
  GetTokenResponse,
  GetTokenResponseType
} from '../../types';
import { ZodError } from 'zod';

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
  const url = new URL(`api/v3/token`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  if (rawResponse.status === 404) {
    // 404 The specified resource was not found
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText,
      description: 'Resource was not found'
    });
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetTokenResponse.safeParse(jsonResponse);

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
