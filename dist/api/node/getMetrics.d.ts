import { BasicAuthenticationPayloadType } from '../../types/general.js';
import 'zod';

declare const getMetrics: (payload: BasicAuthenticationPayloadType) => Promise<string>;

export { getMetrics };
