import { BasicAuthenticationPayloadType } from '../../types/general.js';
import { GetTicketsResponseType } from '../../types/channels.js';
import 'zod';

declare const getTickets: (payload: BasicAuthenticationPayloadType) => Promise<GetTicketsResponseType>;

export { getTickets };
