import { FundChannelsPayloadType, FundChannelsResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const fundChannels: (payload: FundChannelsPayloadType) => Promise<FundChannelsResponseType>;

export { fundChannels };
