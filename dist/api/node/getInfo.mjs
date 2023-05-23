import fetch from "cross-fetch";
import {
  Error,
  GetInfoResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getInfo = async (payload) => {
  const rawResponse = await fetch(`${payload.url}/api/v2/node/info`, {
    method: "GET",
    headers: getHeaders(payload.apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetInfoResponse.safeParse(jsonResponse);
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
  getInfo
};
