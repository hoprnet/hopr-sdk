import fetch from 'cross-fetch';
import {
  Error,
  GetPeersPayloadType,
  GetPeersResponse,
  GetPeersResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getPeers = async (
  url: string,
  apiKey: string,
  body?: GetPeersPayloadType
): Promise<GetPeersResponseType> => {
  const rawResponse = await fetch(
    body?.quality
      ? `${url}/api/v2/node/peers?` +
          new URLSearchParams({
            quality: (body?.quality ?? 0).toString()
          })
      : `${url}/api/v2/node/peers`,
    {
      method: 'GET',
      headers: getHeaders(apiKey)
    }
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetPeersResponse.safeParse(jsonResponse);

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
