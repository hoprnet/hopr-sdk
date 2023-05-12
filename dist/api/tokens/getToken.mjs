import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import { Error, getTokenResponse } from "../../types";
const getToken = async (url, apiKey) => {
  const rawResponse = await fetch(`${url}/api/v2/token`, {
    method: "GET",
    headers: getHeaders(apiKey)
  });
  if (rawResponse.status === 404) {
    throw new APIError({ status: "RESOURCE WAS NOT FOUND" });
  }
  const jsonResponse = await rawResponse.json();
  const parsedRes = getTokenResponse.safeParse(jsonResponse);
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
