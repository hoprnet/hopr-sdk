import fetch from "cross-fetch";
import { APIError, getHeaders } from "../../utils";
import {
  createResponse,
  Error
} from "../../types";
const create = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/tokens`, {
    method: "POST",
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = createResponse.safeParse(jsonResponse);
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
  create
};
