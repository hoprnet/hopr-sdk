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
