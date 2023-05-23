import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import { Error, GetAliasResponse } from "../../types";
const getAlias = async (payload) => {
  const rawResponse = await fetch(
    `${payload.url}/api/v2/aliases/${payload.alias}`,
    {
      method: "GET",
      headers: getHeaders(payload.apiKey)
    }
  );
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetAliasResponse.safeParse(jsonResponse);
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
