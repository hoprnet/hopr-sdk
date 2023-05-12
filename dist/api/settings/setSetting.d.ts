import { SetSettingPayloadType } from '../../types/settings.js';
import 'zod';
import '../../types/general.js';

declare const setSetting: (url: string, apiKey: string, body: SetSettingPayloadType) => Promise<boolean>;

export { setSetting };
