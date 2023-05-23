import { BasicAuthenticationPayloadType } from '../../types/general.js';
import { GetSettingsResponseType } from '../../types/settings.js';
import 'zod';

declare const getSettings: (payload: BasicAuthenticationPayloadType) => Promise<GetSettingsResponseType>;

export { getSettings };
