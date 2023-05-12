import { PeerIdPayloadType, GetTicketsResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const getChannelTickets: (url: string, apiKey: string, body: PeerIdPayloadType) => Promise<GetTicketsResponseType>;

export { getChannelTickets };
