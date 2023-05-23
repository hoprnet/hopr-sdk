import fetch from "cross-fetch";
import {
  AccountResponse,
  Error
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getAddresses = async (payload) => {
  const rawResponse = await fetch(`${payload.url}/api/v2/account/addresses`, {
    method: "GET",
    headers: getHeaders(payload.apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = AccountResponse.safeParse(jsonResponse);
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
  getAddresses
};
