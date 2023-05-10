import fetch from 'cross-fetch';
import {
  Error,
  GetChannelsResponse,
  GetChannelsResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getChannels = async (
  url: string,
  apiKey: string
): Promise<GetChannelsResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/channels`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetChannelsResponse.safeParse(jsonResponse);

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
