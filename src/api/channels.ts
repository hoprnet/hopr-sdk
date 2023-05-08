import {
  ChannelsFundChannelsResponseType,
  type ChannelsFundChannelsPayloadType,
  ChannelsFundChannelsResponse
} from '../types';

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
    // throw custom error
    throw new Error('');
  }
};
