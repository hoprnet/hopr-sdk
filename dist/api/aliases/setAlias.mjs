import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import { Error } from "../../types";
const setAlias = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/aliases`, {
    method: "POST",
    headers: getHeaders(apiKey),
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
