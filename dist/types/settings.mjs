import { z } from "zod";
const GetSettingsResponse = z.object({
  includeRecipient: z.boolean(),
  strategy: z.string()
});
const SetSettingPayload = z.object({
  setting: z.string(),
  settingValue: z.any()
});
export {
  GetSettingsResponse,
  SetSettingPayload
};
