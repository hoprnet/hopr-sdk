import { ZodError } from 'zod';
import {
  APIErrorResponse,
  BasePayloadType,
  GetChannelsResponse,
  GetChannelsResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getChannels = async (
  payload: BasePayloadType
): Promise<GetChannelsResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/channels`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  console.log('GETCHANNELS', rawResponse);
  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetChannelsResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    console.log('Success getChannels');
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    console.log(JSON.stringify(isApiErrorResponse.data));
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
