import fetch from "cross-fetch";
import {
  Error,
  WithdrawResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const withdraw = async (payload) => {
  const body = {
    amount: payload.amount,
    currency: payload.currency,
    recipient: payload.recipient
  };
  const rawResponse = await fetch(`${payload.url}/api/v2/account/withdraw`, {
    method: "POST",
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify({ body })
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = WithdrawResponse.safeParse(jsonResponse);
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
