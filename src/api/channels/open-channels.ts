import fetch from 'cross-fetch';
import {
  Error,
  OpenChannelsResponse,
  OpenChannelsResponseType,
  type OpenChannelsPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const openChannels = async (
  url: string,
  apiKey: string,
  body: OpenChannelsPayloadType
): Promise<OpenChannelsResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/channels`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = OpenChannelsResponse.safeParse(jsonResponse);

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