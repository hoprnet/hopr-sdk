import fetch from "cross-fetch";
import {
  Error,
  GetChannelsResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getChannels = async (url, apiKey) => {
  const rawResponse = await fetch(`${url}/api/v2/channels`, {
    method: "GET",
    headers: getHeaders(apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetChannelsResponse.safeParse(jsonResponse);
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
  getChannels
};
