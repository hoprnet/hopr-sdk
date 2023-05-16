import fetch from 'cross-fetch';
import {
  Error,
  GetPeersPayloadType,
  GetPeersResponse,
  GetPeersResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getPeers = async (
  payload: GetPeersPayloadType
): Promise<GetPeersResponseType> => {
  const rawResponse = await fetch(
    payload?.quality
      ? `${payload.url}/api/v2/node/peers?` +
          new URLSearchParams({
            quality: (payload.quality ?? 0).toString()
          })
      : `${payload.url}/api/v2/node/peers`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiKey)
    }
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetPeersResponse.safeParse(jsonResponse);

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
