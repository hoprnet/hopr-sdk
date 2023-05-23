import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import { Error } from "../../types";
const deleteToken = async (payload) => {
  const rawResponse = await fetch(
    `${payload.url}/api/v2/tokens/${payload.id}`,
    {
      method: "DELETE",
      headers: getHeaders(payload.apiKey)
    }
  );
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
  deleteToken
};
