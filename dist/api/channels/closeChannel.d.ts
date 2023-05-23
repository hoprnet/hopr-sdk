import { CloseChannelPayloadType, CloseChannelResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const closeChannel: (payload: CloseChannelPayloadType) => Promise<CloseChannelResponseType>;

export { closeChannel };
