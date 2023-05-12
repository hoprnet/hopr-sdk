import { GetPeerInfoPayloadType, GetPeerInfoResponseType } from '../../types/peerInfo.js';
import 'zod';
import '../../types/general.js';

declare const getPeerInfo: (url: string, apiKey: string, body: GetPeerInfoPayloadType) => Promise<GetPeerInfoResponseType>;

export { getPeerInfo };
