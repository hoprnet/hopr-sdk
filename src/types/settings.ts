import { z } from 'zod';
import { ZodToType } from './general';

/**
 * Get settings
 */

export const GetSettingsResponse = z.object({
  includeRecipient: z.boolean(),
  strategy: z.string()
});

export type GetSettingsResponseType = ZodToType<typeof GetSettingsResponse>;

/**
 * Set Setting
 */

export const SetSettingPayload = z.object({
  setting: z.string(),
  settingValue: z.any()
});

export type SetSettingPayloadType = ZodToType<typeof SetSettingPayload>;
