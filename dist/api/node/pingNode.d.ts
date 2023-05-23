import { PingNodePayloadType, PingNodeResponseType } from '../../types/node.js';
import 'zod';
import '../../types/general.js';

declare const pingNode: (payload: PingNodePayloadType) => Promise<PingNodeResponseType>;

export { pingNode };
