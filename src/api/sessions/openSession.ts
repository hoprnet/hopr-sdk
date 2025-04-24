import { ZodError } from 'zod';
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
 * Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
 * Give an address a more memorable alias and use it instead of Hopr address.
 * Aliases are kept locally and are not saved or shared on the network.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @param body - A object containing the peer ID and alias to link.
 * @returns A Promise that resolves to true if alias successfully linked to peerId.
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

  const url = new URL(`api/v3/session/${protocol}`, apiEndpoint);
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
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();

  // parsedRes and error {} from HOPRd have the same type,
  // we can only rely on rawResponse.ok to know if its a success
  if (rawResponse.ok) {
    const parsedRes = OpenSessionResponse.safeParse(jsonResponse);
    if (parsedRes.success) {
      return parsedRes.data;
    }
    throw new ZodError(parsedRes.error.issues);
  }

  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);
  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
