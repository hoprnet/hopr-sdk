import fetch from "cross-fetch";
import {
  Error,
  SignResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const sign = async (payload) => {
  const body = {
    message: payload.message
  };
  const rawResponse = await fetch(`${payload.url}/api/v2/messages/sign`, {
    method: "POST",
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = SignResponse.safeParse(jsonResponse);
  if (rawResponse.status === 200 && parsedRes.success) {
    return parsedRes.data.signature;
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
  sign
};
