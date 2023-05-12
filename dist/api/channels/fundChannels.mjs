import fetch from "cross-fetch";
import {
  Error,
  FundChannelsResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const fundChannels = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/fundmulti`, {
    method: "POST",
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = FundChannelsResponse.safeParse(jsonResponse);
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
  fundChannels
};
