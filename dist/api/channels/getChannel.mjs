import fetch from "cross-fetch";
import {
  Error,
  GetChannelResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getChannel = async (url, apiKey, body) => {
  const rawResponse = await fetch(
    `${url}/api/v2/channels/${body.peerId}/${body.direction}`,
    {
      method: "GET",
      headers: getHeaders(apiKey)
    }
  );
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetChannelResponse.safeParse(jsonResponse);
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
  getChannel
};
