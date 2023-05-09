import fetch from 'cross-fetch';
import {
  CloseChannelResponse,
  CloseChannelResponseType,
  Error,
  type CloseChannelPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const closeChannel = async (
  url: string,
  apiKey: string,
  body: CloseChannelPayloadType
): Promise<CloseChannelResponseType> => {
  const rawResponse = await fetch(
    `${url}/api/v2/channels/${body.peerId}/${body.direction}`,
    {
      method: 'DELETE',
      headers: getHeaders(apiKey)
    }
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = CloseChannelResponse.safeParse(jsonResponse);

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
