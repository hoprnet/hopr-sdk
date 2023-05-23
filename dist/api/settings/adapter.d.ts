import { RemoveBasicAuthenticationPayloadType } from '../../types/general.js';
import { SetSettingPayloadType } from '../../types/settings.js';
import 'zod';

declare class SettingsAdapter {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    getSettings(): Promise<{
        includeRecipient: boolean;
        strategy: string;
    }>;
    setSetting(payload: RemoveBasicAuthenticationPayloadType<SetSettingPayloadType>): Promise<boolean>;
}

export { SettingsAdapter };
