import {
  FundChannelsResponseType,
  type FundChannelsPayloadType,
  FundChannelsResponse,
  Error,
  OpenChannelsPayloadType,
  OpenChannelsResponse
} from '../types';
import { APIError, getHeaders } from '../utils';

export const fundChannels = async (
  url: string,
  apiKey: string,
  body: FundChannelsPayloadType
): Promise<FundChannelsResponseType> => {
  const rawResponse = await fetch(`${url}/fundmulti`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = FundChannelsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    throw new APIError(Error.parse(jsonResponse));
  }
};

export const OpenChannels = async (
  url: string,
  apiKey: string,
  body: OpenChannelsPayloadType
) => {
  const rawResponse = await fetch(`${url}/channels`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = OpenChannelsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    throw new APIError(Error.parse(jsonResponse));
  }
};
