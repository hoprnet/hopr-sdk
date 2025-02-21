import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  PeekMessagePayloadType,
  PeekMessageResponse,
  PeekMessageResponseType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Peek the oldest message currently present in the nodes message inbox.
 * The message is not removed from the inbox.
 * @returns - A promise that resolves to the oldest message currently present in the nodes message inbox.
 */
export const peekMessage = async (
  payload: PeekMessagePayloadType
): Promise<PeekMessageResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const urlWithApiPath = new URL('api/v3/messages/peek', apiEndpointParsed);
  const fullUrl = urlWithApiPath.toString();
  const body: RemoveBasicAuthenticationPayloadType<PeekMessagePayloadType> = {
    tag: payload.tag
  };

  const rawResponse = await fetchWithTimeout(
    fullUrl,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = PeekMessageResponse.safeParse(jsonResponse);

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
