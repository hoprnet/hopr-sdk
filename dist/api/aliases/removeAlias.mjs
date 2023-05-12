import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import { Error } from "../../types";
const removeAlias = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/aliases/${body.alias}`, {
    method: "DELETE",
    headers: getHeaders(apiKey)
  });
  if (rawResponse.status === 204) {
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
  removeAlias
};
