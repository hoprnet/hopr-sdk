import { ZodError } from 'zod';
import {
  APIErrorResponse,
  GetChannelPayloadType,
  GetChannelResponse,
  GetChannelResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getChannel = async (
  payload: GetChannelPayloadType
): Promise<GetChannelResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/channels/${payload.peerId}/${payload.direction}`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetChannelResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
