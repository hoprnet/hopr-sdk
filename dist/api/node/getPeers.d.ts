import { GetPeersPayloadType, GetPeersResponseType } from '../../types/node.js';
import 'zod';
import '../../types/general.js';

declare const getPeers: (payload: GetPeersPayloadType) => Promise<GetPeersResponseType>;

export { getPeers };
