import { PeerIdPayloadType } from '../../types/channels.js';
import 'zod';
import '../../types/general.js';

/**
 * // TODO: Takes more than 200s to execute
 */
declare const redeemChannelTickets: (url: string, apiKey: string, body: PeerIdPayloadType) => Promise<boolean>;

export { redeemChannelTickets };
