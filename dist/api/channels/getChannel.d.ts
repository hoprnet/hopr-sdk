import { GetChannelPayloadType, GetChannelResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const getChannel: (payload: GetChannelPayloadType) => Promise<GetChannelResponseType>;

export { getChannel };
