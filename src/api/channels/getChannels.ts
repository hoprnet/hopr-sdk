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
  if (rawResponse.status >= 500) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  const jsonResponse = await rawResponse.json();

  // any non-2xx response is an error path
  if (!rawResponse.ok) {
    const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);
    if (isApiErrorResponse.success) {
      throw new sdkApiError({
        status: rawResponse.status,
        statusText: isApiErrorResponse.data.status,
        hoprdErrorPayload: isApiErrorResponse.data
      });
    }
    throw isApiErrorResponse.error;
  }

  const parsedRes = GetChannelsResponse.safeParse(jsonResponse);
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
  throw parsedRes.error;
};
