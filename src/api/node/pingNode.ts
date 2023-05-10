import fetch from 'cross-fetch';
import {
  Error,
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
