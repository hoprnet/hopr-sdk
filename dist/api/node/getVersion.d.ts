import { BasicAuthenticationPayloadType } from '../../types/general.js';
import 'zod';

declare const getVersion: (payload: BasicAuthenticationPayloadType) => Promise<string>;

export { getVersion };
