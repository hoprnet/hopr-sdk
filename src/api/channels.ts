import {
  ChannelsFundChannelsResponseType,
  type ChannelsFundChannelsPayloadType,
  ChannelsFundChannelsResponse,
  Error
} from '../types';
import { APIError } from '../utils';

export const channelsFundChannels = async (
  body: ChannelsFundChannelsPayloadType
): Promise<ChannelsFundChannelsResponseType> => {
  const rawResponse = await fetch('/fundmulti', {
    method: 'post',
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = ChannelsFundChannelsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    throw new APIError(Error.parse(jsonResponse));
  }
};
