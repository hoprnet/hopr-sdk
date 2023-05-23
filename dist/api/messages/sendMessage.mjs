import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import {
  Error as ZodError
} from "../../types";
const sendMessage = async (payload) => {
  if (!payload.path && !payload.hops)
    throw new Error("No path or number of hops provided.");
  const body = {
    body: payload.body,
    recipient: payload.recipient,
    hops: payload.hops,
    path: payload.path
  };
  const rawResponse = await fetch(`${payload.url}/api/v2/messages`, {
    method: "POST",
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify(body)
  });
  if (rawResponse.status === 202) {
    return await rawResponse.text();
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    const jsonResponse = await rawResponse.json();
    throw new APIError(ZodError.parse(jsonResponse));
  }
};
export {
  sendMessage
};
