import { PeerIdPayloadType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

/**
 * // TODO: Takes more than 200s to execute
 */
declare const redeemChannelTickets: (payload: PeerIdPayloadType) => Promise<boolean>;

export { redeemChannelTickets };
