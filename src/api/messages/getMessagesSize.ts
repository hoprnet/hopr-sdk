import { ZodError } from 'zod';
import {
  APIErrorResponse,
  GetMessagesSizePayloadType,
  GetMessagesSizeResponse,
  GetMessagesSizeResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getMessagesSize = async (
  payload: GetMessagesSizePayloadType
): Promise<GetMessagesSizeResponseType> => {
  const url = new URL('api/v3/messages/size', payload.apiEndpoint);
  if (payload.tag) {
    url.searchParams.set('tag', payload.tag.toString());
  }
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetMessagesSizeResponse.safeParse(jsonResponse);

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
