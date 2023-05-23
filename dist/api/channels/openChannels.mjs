import fetch from "cross-fetch";
import {
  Error,
  OpenChannelsResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const openChannels = async (payload) => {
  const body = {
    amount: payload.amount,
    peerId: payload.peerId
  };
  const rawResponse = await fetch(`${payload.url}/api/v2/channels`, {
    method: "POST",
    headers: getHeaders(payload.apiKey),
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
