import { OpenChannelsPayloadType, OpenChannelsResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const openChannels: (url: string, apiKey: string, body: OpenChannelsPayloadType) => Promise<OpenChannelsResponseType>;

export { openChannels };
