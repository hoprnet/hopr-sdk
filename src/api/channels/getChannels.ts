import { ZodError } from 'zod';
import {
  APIErrorResponse,
  GetChannelsPayloadType,
  GetChannelsResponse,
  GetChannelsResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getChannels = async (
  payload: GetChannelsPayloadType
): Promise<GetChannelsResponseType> => {
  const url = new URL('api/v3/channels', payload.apiEndpoint);
  url.searchParams.set('includingClosed', String(!!payload.includingClosed));
  url.searchParams.set('fullTopology', String(!!payload.fullTopology));
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetChannelsResponse.safeParse(jsonResponse);

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
