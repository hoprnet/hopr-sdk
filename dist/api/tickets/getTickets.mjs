import fetch from "cross-fetch";
import { Error, GetTicketsResponse } from "../../types";
import { APIError, getHeaders } from "../../utils";
const getTickets = async (url, apiKey) => {
  const rawResponse = await fetch(`${url}/api/v2/tickets`, {
    method: "GET",
    headers: getHeaders(apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetTicketsResponse.safeParse(jsonResponse);
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
  getTickets
};
