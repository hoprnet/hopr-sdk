import {
  CloseChannelResponse,
  CloseChannelResponseType,
  Error,
  type CloseChannelPayloadType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const closeChannel = async (
  payload: CloseChannelPayloadType
): Promise<CloseChannelResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/channels/${payload.peerId}/${payload.direction}`,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = CloseChannelResponse.safeParse(jsonResponse);

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
