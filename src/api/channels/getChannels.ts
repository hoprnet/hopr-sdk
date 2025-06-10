import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  GetChannelsPayloadType,
  GetChannelsResponse,
  GetChannelsResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getChannels = async (
  payload: GetChannelsPayloadType
): Promise<GetChannelsResponseType> => {
  const url = new URL('api/v4/channels', payload.apiEndpoint);
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
    parsedRes.data.all.forEach((channel) => {
      channel.balance = channel.balance.includes(' ')
        ? (channel.balance.split(' ')[0] as string)
        : channel.balance;
    });

    parsedRes.data.incoming.forEach((channel) => {
      channel.balance = channel.balance.includes(' ')
        ? (channel.balance.split(' ')[0] as string)
        : channel.balance;
    });

    parsedRes.data.outgoing.forEach((channel) => {
      channel.balance = channel.balance.includes(' ')
        ? (channel.balance.split(' ')[0] as string)
        : channel.balance;
    });

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
