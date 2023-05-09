import fetch from 'cross-fetch';
import { Error, type PeerIdPayloadType } from '../../types';
import { APIError, getHeaders } from '../../utils';

export const redeemTickets = async (
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
  } else {
    console.log({ rawResponse });
    const jsonResponse = await rawResponse.json();
    console.log({ jsonResponse });
    throw new APIError(Error.parse(jsonResponse));
  }
};
