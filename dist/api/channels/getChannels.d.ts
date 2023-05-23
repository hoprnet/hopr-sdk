import { BasicAuthenticationPayloadType } from '../../types/general.js';
import { GetChannelsResponseType } from '../../types/channels.js';
import 'zod';

declare const getChannels: (payload: BasicAuthenticationPayloadType) => Promise<GetChannelsResponseType>;

export { getChannels };
