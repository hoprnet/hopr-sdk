import fetch from "cross-fetch";
import {
  Error,
  GetPeersResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getPeers = async (payload) => {
  var _a;
  const rawResponse = await fetch(
    (payload == null ? void 0 : payload.quality) ? `${payload.url}/api/v2/node/peers?` + new URLSearchParams({
      quality: ((_a = payload.quality) != null ? _a : 0).toString()
    }) : `${payload.url}/api/v2/node/peers`,
    {
      method: "GET",
      headers: getHeaders(payload.apiKey)
    }
  );
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetPeersResponse.safeParse(jsonResponse);
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
  getPeers
};
