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
