import { BasicAuthenticationPayloadType } from '../../types/general.js';
import { GetEntryNodesResponseType } from '../../types/node.js';
import 'zod';

declare const getEntryNodes: (payload: BasicAuthenticationPayloadType) => Promise<GetEntryNodesResponseType>;

export { getEntryNodes };
