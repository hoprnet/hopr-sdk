import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  RemoveBasicAuthenticationPayloadType,
  SendMessagePayloadType,
  Error as ZodError
} from '../../types';

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

  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/messages`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  if (rawResponse.status === 202) {
    return await rawResponse.text();
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    const jsonResponse = await rawResponse.json();

    throw new APIError(ZodError.parse(jsonResponse));
  }
};
