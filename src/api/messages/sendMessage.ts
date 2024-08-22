import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  ApiErrorResponse,
  RemoveBasicAuthenticationPayloadType,
  SendMessagePayloadType
} from '../../types';
import { ZodError } from 'zod';

/**
 * Send a message to another peer using a given path (list of node addresses that should relay our message through network). If no path is given, HOPR will attempt to find a path.
 * @returns - A promise that resolves to the sent message.
 */
export const sendMessage = async (
  payload: SendMessagePayloadType
): Promise<string> => {
  const body: RemoveBasicAuthenticationPayloadType<SendMessagePayloadType> = {
    tag: payload.tag,
    body: payload.body,
    peerId: payload.peerId,
    path: payload.path,
    hops: payload.hops
  };

  // direct messages need an empty path
  if (!body.hops && !body.path) {
    body.path = [];
  }

  const url = new URL('api/v3/messages', payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 202) {
    return rawResponse.text();
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
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
