import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import {
  Error,
  GetTokenResponse
} from "../../types";
const getToken = async (payload) => {
  const rawResponse = await fetch(`${payload.url}/api/v2/token`, {
    method: "GET",
    headers: getHeaders(payload.apiKey)
  });
  if (rawResponse.status === 404) {
    throw new APIError({ status: "RESOURCE WAS NOT FOUND" });
  }
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetTokenResponse.safeParse(jsonResponse);
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
  getToken
};
