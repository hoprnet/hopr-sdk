import {
  ApiErrorResponse,
  RemoveBasicAuthenticationPayloadType,
  OpenSessionResponse,
  OpenSessionResponseType,
  OpenSessionPayloadType,
  OpenSessionPayloadCallType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Opens HOPR session with the specified configuration.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @returns A Promise that resolves to the opened session payload.
 * @throws An error that occurred while processing the request.
 */
export const openSession = async (
  payload: OpenSessionPayloadType
): Promise<OpenSessionResponseType> => {
  const { protocol, apiToken, apiEndpoint, ...rest } = payload;
  const body: RemoveBasicAuthenticationPayloadType<OpenSessionPayloadCallType> =
    {
      ...rest
    };

  const url = new URL(`api/v4/session/${protocol}`, apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(apiToken),
      body: JSON.stringify(body)
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
  const parsedRes = OpenSessionResponse.safeParse(jsonResponse);

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
