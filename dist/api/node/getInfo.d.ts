import { BasicAuthenticationPayloadType } from '../../types/general.js';
import { GetInfoResponseType } from '../../types/node.js';
import 'zod';

declare const getInfo: (payload: BasicAuthenticationPayloadType) => Promise<GetInfoResponseType>;

export { getInfo };
