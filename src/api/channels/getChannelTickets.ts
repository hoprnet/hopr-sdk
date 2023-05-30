import {
  Error,
  GetChannelTicketsResponse,
  GetChannelTicketsResponseType,
  type PeerIdPayloadType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getChannelTickets = async (
  payload: PeerIdPayloadType
): Promise<GetChannelTicketsResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/channels/${payload.peerId}/tickets`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetChannelTicketsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    throw new APIError(Error.parse(jsonResponse));
  }
};
