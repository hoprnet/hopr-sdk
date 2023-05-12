import { GetChannelPayloadType, GetChannelResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const getChannel: (url: string, apiKey: string, body: GetChannelPayloadType) => Promise<GetChannelResponseType>;

export { getChannel };
