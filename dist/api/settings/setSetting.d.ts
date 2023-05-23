import { SetSettingPayloadType } from '../../types/settings.js';
import 'zod';
import '../../types/general.js';

declare const setSetting: (payload: SetSettingPayloadType) => Promise<boolean>;

export { setSetting };
