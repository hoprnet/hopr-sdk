import {
  Error,
  OpenChannelsResponse,
  OpenChannelsResponseType,
  type OpenChannelsPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const openChannels = async (
  payload: OpenChannelsPayloadType
): Promise<OpenChannelsResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<OpenChannelsPayloadType> = {
    amount: payload.amount,
    peerId: payload.peerId
  };

  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/channels`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiKey),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = OpenChannelsResponse.safeParse(jsonResponse);

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
