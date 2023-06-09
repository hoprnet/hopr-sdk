import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  APIErrorResponse,
  RemoveBasicAuthenticationPayloadType,
  SendMessagePayloadType
} from '../../types';
import { ZodError } from 'zod';

/**
 * Send a message to another peer using a given path (list of node addresses that should relay our message through network). If no path is given, HOPR will attempt to find a path.
 *
 * @param apiEndpoint - The API endpoint to send the message to.
 * @param apiToken - The API token to use for authentication.
 * @param body - The message body to send.
 * @param recipient - The recipient of the message.
 * @param path - The path to take for the message, if any.
 * @param hops - The number of hops to take for the message, if any.
 *
 * @returns - A promise that resolves to the sent message.
 */
export const sendMessage = async (
  payload: SendMessagePayloadType
): Promise<string> => {
  if (!payload.path && !payload.hops)
    throw new Error('No path or number of hops provided.');

  const body: RemoveBasicAuthenticationPayloadType<SendMessagePayloadType> = {
    body: payload.body,
    recipient: payload.recipient,
    hops: payload.hops,
    path: payload.path
  };

  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/messages`,
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
