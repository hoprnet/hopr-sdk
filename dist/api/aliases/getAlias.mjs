import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import { Error, getAliasResponse } from "../../types";
const getAlias = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/aliases/${body.alias}`, {
    method: "GET",
    headers: getHeaders(apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = getAliasResponse.safeParse(jsonResponse);
  if (rawResponse.status === 200 && parsedRes.success) {
    return parsedRes.data.peerId;
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
  getAlias
};
