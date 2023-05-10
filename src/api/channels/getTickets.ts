import fetch from 'cross-fetch';
import {
  Error,
  GetTicketsResponse,
  GetTicketsResponseType,
  type PeerIdPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getTickets = async (
  url: string,
  apiKey: string,
  body: PeerIdPayloadType
): Promise<GetTicketsResponseType> => {
  const rawResponse = await fetch(
    `${url}/api/v2/channels/${body.peerId}/tickets`,
    {
      method: 'GET',
      headers: getHeaders(apiKey)
    }
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetTicketsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    // server error that was unexpected
    if (rawResponse.status > 499)
      throw new APIError({
        status: rawResponse.status.toString(),
        error: rawResponse.statusText
      });
    throw new APIError(Error.parse(jsonResponse));
  }
};
