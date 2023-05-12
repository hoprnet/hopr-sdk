import { PingNodePayloadType, PingNodeResponseType } from '../../types/node.js';
import 'zod';
import '../../types/general.js';

declare const pingNode: (url: string, apiKey: string, body: PingNodePayloadType) => Promise<PingNodeResponseType>;

export { pingNode };
