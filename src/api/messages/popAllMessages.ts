import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  PopAllMessagesPayloadType,
  PopAllMessagesResponse,
  PopAllMessagesResponseType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Get the list of messages currently present in the nodes message inbox.
 * The messages are removed from the inbox.
 * @returns - A promise that resolves to the list of messages currently present in the nodes message inbox.
 */
export const popAllMessages = async (
  payload: PopAllMessagesPayloadType
): Promise<PopAllMessagesResponseType> => {
  const url = new URL('api/v3/messages/pop-all', payload.apiEndpoint);
  const body: RemoveBasicAuthenticationPayloadType<PopAllMessagesPayloadType> =
    {
      tag: payload.tag
    };

  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = PopAllMessagesResponse.safeParse(jsonResponse);

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
