import fetch from 'cross-fetch';
import {
  Error,
  OpenChannelResponse,
  OpenChannelResponseType,
  type OpenChannelPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const openChannel = async (
  payload: OpenChannelPayloadType
): Promise<OpenChannelResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<OpenChannelPayloadType> = {
    amount: payload.amount,
    peerId: payload.peerId
  };

  const rawResponse = await fetch(`${payload.url}/api/v2/channels`, {
    method: 'POST',
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = OpenChannelResponse.safeParse(jsonResponse);

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
