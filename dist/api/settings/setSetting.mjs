import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import { Error } from "../../types";
const setSetting = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/settings/${body.setting}`, {
    method: "PUT",
    headers: getHeaders(apiKey),
    body: JSON.stringify({ settingValue: body.settingValue })
  });
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
