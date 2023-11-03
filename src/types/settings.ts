import { z } from 'zod';
import { BasePayload } from './general';

/**
 * Get settings
 */

export const GetSettingsResponse = z.object({
  includeRecipient: z.boolean(),
  strategy: z.string().optional()
});

export type GetSettingsResponseType = z.infer<typeof GetSettingsResponse>;

/**
 * Set Setting
 */

export const SetSettingPayload = BasePayload.extend({
  setting: z.string(),
  settingValue: z.any()
});

export type SetSettingPayloadType = z.infer<typeof SetSettingPayload>;
