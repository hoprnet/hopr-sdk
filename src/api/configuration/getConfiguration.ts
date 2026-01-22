import { ZodError } from 'zod';
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
  if (rawResponse.status !== 200) {
    throw new Error(rawResponse.statusText);
  }

  let jsonResponse: any;

  try {
    jsonResponse = await rawResponse.json();
  } catch (e) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText,
      description: 'Failed parsing response'
    });
  }

  return jsonResponse;
};
