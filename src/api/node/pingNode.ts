import fetch from 'cross-fetch';
import {
  Error,
  PingNodePayloadType,
  PingNodeResponse,
  PingNodeResponseType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const pingNode = async (
  payload: PingNodePayloadType
): Promise<PingNodeResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<PingNodePayloadType> = {
    peerId: payload.peerId
  };

  const rawResponse = await fetch(`${payload.url}/api/v2/node/ping`, {
    method: 'POST',
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = PingNodeResponse.safeParse(jsonResponse);

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
