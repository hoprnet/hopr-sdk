import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  APIErrorResponse,
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

  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v3/messages`,
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
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
