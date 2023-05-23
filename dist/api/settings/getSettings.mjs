import fetch from "cross-fetch";
import {
  Error,
  GetSettingsResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getSettings = async (payload) => {
  const rawResponse = await fetch(`${payload.url}/api/v2/settings`, {
    method: "GET",
    headers: getHeaders(payload.apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetSettingsResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    return parsedRes.data;
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    throw new APIError(Error.parse(jsonResponse));
  }
};
export {
  getSettings
};
