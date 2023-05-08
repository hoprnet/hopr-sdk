import {
  CloseChannelResponse,
  Error,
  FundChannelsResponse,
  GetChannelsResponse,
  GetTicketsResponse,
  OpenChannelsResponse,
  type CloseChannelPayloadType,
  type FundChannelsPayloadType,
  type FundChannelsResponseType,
  type OpenChannelsPayloadType,
  type PeerIdPayloadType
} from '../types';
import { APIError, getHeaders } from '../utils';

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
    throw new APIError(Error.parse(jsonResponse));
  }
};

export const openChannels = async (
  url: string,
  apiKey: string,
  body: OpenChannelsPayloadType
) => {
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
    throw new APIError(Error.parse(jsonResponse));
  }
};

export const getChannels = async (url: string, apiKey: string) => {
  const rawResponse = await fetch(`${url}/api/v2/channels`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetChannelsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    throw new APIError(Error.parse(jsonResponse));
  }
};

export const redeemTickets = async (
  url: string,
  apiKey: string,
  body: PeerIdPayloadType
) => {
  const rawResponse = await fetch(
    `${url}/api/v2/channels/${body.peerId}/tickets/redeem`,
    {
      method: 'POST',
      headers: getHeaders(apiKey)
    }
  );

  if (rawResponse.status === 204) {
    return true;
  } else {
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};

export const getTickets = async (
  url: string,
  apiKey: string,
  body: PeerIdPayloadType
) => {
  const rawResponse = await fetch(
    `${url}/api/v2/channels/${body.peerId}/tickets`,
    {
      method: 'GET',
      headers: getHeaders(apiKey)
    }
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetTicketsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    throw new APIError(Error.parse(jsonResponse));
  }
};

export const closeChannel = async (
  url: string,
  apiKey: string,
  body: CloseChannelPayloadType
) => {
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
    throw new APIError(Error.parse(jsonResponse));
  }
};
