import { BasicAuthenticationPayloadType } from '../../types/general.js';
import 'zod';

/**
 * Disclaimer: takes really long to succeed
 */
declare const redeemTickets: (payload: BasicAuthenticationPayloadType) => Promise<boolean>;

export { redeemTickets };
