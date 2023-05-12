import { FundChannelsPayloadType, FundChannelsResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const fundChannels: (url: string, apiKey: string, body: FundChannelsPayloadType) => Promise<FundChannelsResponseType>;

export { fundChannels };
