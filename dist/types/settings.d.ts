import { z } from 'zod';
import { ZodToType } from './general.js';

/**
 * Get settings
 */
declare const GetSettingsResponse: z.ZodObject<{
    includeRecipient: z.ZodBoolean;
    strategy: z.ZodString;
}, "strip", z.ZodTypeAny, {
    includeRecipient: boolean;
    strategy: string;
}, {
    includeRecipient: boolean;
    strategy: string;
}>;
type GetSettingsResponseType = ZodToType<typeof GetSettingsResponse>;
/**
 * Set Setting
 */
declare const SetSettingPayload: z.ZodObject<{
    setting: z.ZodString;
    settingValue: z.ZodAny;
}, "strip", z.ZodTypeAny, {
    setting: string;
    settingValue?: any;
}, {
    setting: string;
    settingValue?: any;
}>;
type SetSettingPayloadType = ZodToType<typeof SetSettingPayload>;

export { GetSettingsResponse, GetSettingsResponseType, SetSettingPayload, SetSettingPayloadType };
