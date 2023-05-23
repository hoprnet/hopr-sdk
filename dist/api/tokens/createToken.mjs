import fetch from "cross-fetch";
import {
  CreateTokenResponse,
  Error
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const createToken = async (payload) => {
  const body = {
    capabilities: payload.capabilities,
    description: payload.description,
    lifetime: payload.lifetime
  };
  const rawResponse = await fetch(`${payload.url}/api/v2/tokens`, {
    method: "POST",
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = CreateTokenResponse.safeParse(jsonResponse);
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
  createToken
};
