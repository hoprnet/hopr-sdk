import { GetSettingsResponseType } from '../../types/settings.js';
import 'zod';
import '../../types/general.js';

declare const getSettings: (url: string, apiKey: string) => Promise<GetSettingsResponseType>;

export { getSettings };
