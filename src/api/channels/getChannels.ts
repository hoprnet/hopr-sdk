import fetch from 'cross-fetch';
import {
  BasicAuthenticationPayloadType,
  Error,
  GetChannelsResponse,
  GetChannelsResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getChannels = async (
  payload: BasicAuthenticationPayloadType
): Promise<GetChannelsResponseType> => {
  const rawResponse = await fetch(`${payload.url}/api/v2/channels`, {
    method: 'GET',
    headers: getHeaders(payload.apiKey)
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
