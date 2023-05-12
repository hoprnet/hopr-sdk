import { GetChannelsResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const getChannels: (url: string, apiKey: string) => Promise<GetChannelsResponseType>;

export { getChannels };
