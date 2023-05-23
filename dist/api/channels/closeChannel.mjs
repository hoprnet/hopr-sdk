import fetch from "cross-fetch";
import {
  CloseChannelResponse,
  Error
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const closeChannel = async (payload) => {
  const rawResponse = await fetch(
    `${payload.url}/api/v2/channels/${payload.peerId}/${payload.direction}`,
    {
      method: "DELETE",
      headers: getHeaders(payload.apiKey)
    }
  );
  const jsonResponse = await rawResponse.json();
  const parsedRes = CloseChannelResponse.safeParse(jsonResponse);
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
  closeChannel
};
