import { GetPeersPayloadType, GetPeersResponseType } from '../../types/node.js';
import 'zod';
import '../../types/general.js';

declare const getPeers: (url: string, apiKey: string, body?: GetPeersPayloadType) => Promise<GetPeersResponseType>;

export { getPeers };
