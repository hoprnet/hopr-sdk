import { SetSettingPayloadType } from '../../types/settings.js';
import 'zod';
import '../../types/general.js';

declare class SettingsWrapper {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    getSettings(): Promise<{
        includeRecipient: boolean;
        strategy: string;
    }>;
    setSetting(body: SetSettingPayloadType): Promise<boolean>;
}

export { SettingsWrapper };
