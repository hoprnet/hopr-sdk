import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import {
  GetPeerInfoResponse,
  Error
} from "../../types";
const getPeerInfo = async (payload) => {
  const rawResponse = await fetch(
    `${payload.url}/api/v2/peerInfo/${payload.peerId}`,
    {
      method: "GET",
      headers: getHeaders(payload.apiKey)
    }
  );
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
