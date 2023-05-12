import { GetTicketsResponseType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

declare const getTickets: (url: string, apiKey: string) => Promise<GetTicketsResponseType>;

export { getTickets };
