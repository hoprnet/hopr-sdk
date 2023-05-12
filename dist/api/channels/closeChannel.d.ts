import { CloseChannelPayloadType, CloseChannelResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const closeChannel: (url: string, apiKey: string, body: CloseChannelPayloadType) => Promise<CloseChannelResponseType>;

export { closeChannel };
