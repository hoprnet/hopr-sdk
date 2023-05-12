import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import {
  GetPeerInfoResponse,
  Error
} from "../../types";
const getPeerInfo = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/peerInfo/${body.peerId}`, {
    method: "GET",
    headers: getHeaders(apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetPeerInfoResponse.safeParse(jsonResponse);
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
  getPeerInfo
};
