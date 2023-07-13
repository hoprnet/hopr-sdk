import { ZodError } from 'zod';
import {
  APIErrorResponse,
  PopAllMessagesPayloadType,
  PopAllMessagesResponse,
  PopAllMessagesResponseType,
  PopMessageResponse
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const popAllMessages = async (
  payload: PopAllMessagesPayloadType
): Promise<PopAllMessagesResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const urlWithApiPath = new URL('api/v3/messages/pop-all', apiEndpointParsed);

  const params = new URLSearchParams();

  // only add tag to search params if it is part of payload
  if (payload.tag) {
    params.append('tag', payload.tag.toString());
  }

  // join base url with search params
  urlWithApiPath.search = params.toString();

  const fullUrl = urlWithApiPath.toString();

  const rawResponse = await fetchWithTimeout(
    fullUrl,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken)
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
