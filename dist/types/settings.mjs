import { z } from "zod";
import { BasicAuthenticationPayload } from "./general";
const GetSettingsResponse = z.object({
  includeRecipient: z.boolean(),
  strategy: z.string()
});
const SetSettingPayload = BasicAuthenticationPayload.extend({
  setting: z.string(),
  settingValue: z.any()
});
export {
  GetSettingsResponse,
  SetSettingPayload
};
