import fetch from 'cross-fetch';
import {
  Error,
  GetPeersPayloadType,
  GetPeersResponse,
  GetPeersResponseType,
  PingNodePayloadType,
  PingNodeResponse,
  PingNodeResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const pingNode = async (
  url: string,
  apiKey: string,
  body: PingNodePayloadType
): Promise<PingNodeResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/node/ping`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = PingNodeResponse.safeParse(jsonResponse);

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
