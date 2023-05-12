import fetch from "cross-fetch";
import { getHeaders, APIError } from "../../utils";
import { getAliasesResponse, Error } from "../../types";
const getAliases = async (url, apiKey) => {
  const rawResponse = await fetch(`${url}/api/v2/aliases`, {
    method: "GET",
    headers: getHeaders(apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = getAliasesResponse.safeParse(jsonResponse);
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
