import fetch from "cross-fetch";
import { Error } from "../../types";
import { APIError, getHeaders } from "../../utils";
const setSetting = async (payload) => {
  const rawResponse = await fetch(
    `${payload.url}/api/v2/settings/${payload.setting}`,
    {
      method: "PUT",
      headers: getHeaders(payload.apiKey),
      body: JSON.stringify({ settingValue: payload.settingValue })
    }
  );
  if (rawResponse.status === 204) {
    return true;
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};
export {
  setSetting
};
