import fetch from "cross-fetch";
import {
  Error,
  GetTicketsResponse
} from "../../types";
import { APIError, getHeaders } from "../../utils";
const getChannelTickets = async (payload) => {
  const rawResponse = await fetch(
    `${payload.url}/api/v2/channels/${payload.peerId}/tickets`,
    {
      method: "GET",
      headers: getHeaders(payload.apiKey)
    }
  );
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
  getChannelTickets
};
