import fetch from 'cross-fetch';
import {
  Error,
  GetChannelPayloadType,
  GetChannelResponse,
  GetChannelResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getChannel = async (
  url: string,
  apiKey: string,
  body: GetChannelPayloadType
): Promise<GetChannelResponseType> => {
  const rawResponse = await fetch(
    `${url}/api/v2/channels/${body.peerId}/${body.direction}`,
    {
      method: 'GET',
      headers: getHeaders(apiKey)
    }
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetChannelResponse.safeParse(jsonResponse);

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
