import fetch from "cross-fetch";
import { Error, withdrawResponse } from "../../types";
import { APIError, getHeaders } from "../../utils";
const withdraw = async (url, apiKey, body) => {
  const rawResponse = await fetch(`${url}/api/v2/account/withdraw`, {
    method: "POST",
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = withdrawResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    return parsedRes.data.receipt;
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
  withdraw
};
