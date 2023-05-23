import fetch from "cross-fetch";
import {
  Error,
  GetAliasesResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getAliases = async (payload) => {
  const rawResponse = await fetch(`${payload.url}/api/v2/aliases`, {
    method: "GET",
    headers: getHeaders(payload.apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetAliasesResponse.safeParse(jsonResponse);
  if (parsedRes.success && rawResponse.status === 200) {
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
  getAliases
};
