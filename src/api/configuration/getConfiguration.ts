import {
  ApiErrorResponse,
  BasePayloadType,
  GetConfigurationResponse,
  GetConfigurationResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Get the configuration of your node.
 * Configuration is not type safe
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to use for authentication.
 * @returns An object with configuration of your node.
 * @throws An error that occurred while processing the request.
 */
export const getConfiguration = async (
  payload: BasePayloadType
): Promise<GetConfigurationResponseType> => {
  const url = new URL(`api/v4/node/configuration`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetConfigurationResponse.safeParse(jsonResponse);

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
