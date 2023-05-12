import fetch from "cross-fetch";
import {
  Error,
  PingNodeResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const pingNode = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/node/ping`, {
    method: "POST",
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = PingNodeResponse.safeParse(jsonResponse);
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
  pingNode
};
