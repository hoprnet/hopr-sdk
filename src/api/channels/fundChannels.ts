import fetch from 'cross-fetch';
import {
  Error,
  FundChannelsResponse,
  type FundChannelsPayloadType,
  type FundChannelsResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const fundChannels = async (
  url: string,
  apiKey: string,
  body: FundChannelsPayloadType
): Promise<FundChannelsResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/fundmulti`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = FundChannelsResponse.safeParse(jsonResponse);

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
