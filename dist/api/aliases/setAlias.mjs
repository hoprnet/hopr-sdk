import fetch from "cross-fetch";
import {
  Error
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const setAlias = async (payload) => {
  const body = {
    alias: payload.alias,
    peerId: payload.peerId
  };
  const rawResponse = await fetch(`${payload.url}/api/v2/aliases`, {
    method: "POST",
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify(body)
  });
  if (rawResponse.status === 201) {
    return true;
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};
export {
  setAlias
};
