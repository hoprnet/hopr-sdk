import { OpenChannelsPayloadType, OpenChannelsResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const openChannels: (payload: OpenChannelsPayloadType) => Promise<OpenChannelsResponseType>;

export { openChannels };
