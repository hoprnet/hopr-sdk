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
