import fetch from "cross-fetch";
import {
  Error,
  GetPeersResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getPeers = async (url, apiKey, body) => {
  var _a;
  const rawResponse = await fetch(
    (body == null ? void 0 : body.quality) ? `${url}/api/v2/node/peers?` + new URLSearchParams({
      quality: ((_a = body == null ? void 0 : body.quality) != null ? _a : 0).toString()
    }) : `${url}/api/v2/node/peers`,
    {
      method: "GET",
      headers: getHeaders(apiKey)
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
