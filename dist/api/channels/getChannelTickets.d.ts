import { PeerIdPayloadType, GetTicketsResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const getChannelTickets: (payload: PeerIdPayloadType) => Promise<GetTicketsResponseType>;

export { getChannelTickets };
