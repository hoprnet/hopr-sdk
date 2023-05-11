import fetch from 'cross-fetch';
import { Error, type PeerIdPayloadType } from '../../types';
import { APIError, getHeaders } from '../../utils';

/**
 * // TODO: Takes more than 200s to execute
 */
export const redeemChannelTickets = async (
  url: string,
  apiKey: string,
  body: PeerIdPayloadType
): Promise<boolean> => {
  const rawResponse = await fetch(
    `${url}/api/v2/channels/${body.peerId}/tickets/redeem`,
    {
      method: 'POST',
      headers: getHeaders(apiKey)
    }
  );

  if (rawResponse.status === 204) {
    return true;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};