import { ZodError } from 'zod';
import {
  APIErrorResponse,
  PopAllMessagesPayloadType,
  PopAllMessagesResponse,
  PopAllMessagesResponseType,
  PopMessageResponse,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

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
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
