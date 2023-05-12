import fetch from "cross-fetch";
import {
  Error,
  OpenChannelsResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const openChannels = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/channels`, {
    method: "POST",
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = OpenChannelsResponse.safeParse(jsonResponse);
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
  openChannels
};
