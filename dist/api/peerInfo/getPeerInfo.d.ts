import { GetPeerInfoPayloadType, GetPeerInfoResponseType } from '../../types/peerInfo.js';
import 'zod';
import '../../types/general.js';

declare const getPeerInfo: (payload: GetPeerInfoPayloadType) => Promise<GetPeerInfoResponseType>;

export { getPeerInfo };
