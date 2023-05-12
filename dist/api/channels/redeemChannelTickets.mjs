import fetch from "cross-fetch";
import { Error } from "../../types";
import { APIError, getHeaders } from "../../utils";
const redeemChannelTickets = async (url, apiKey, body) => {
  const rawResponse = await fetch(
    `${url}/api/v2/channels/${body.peerId}/tickets/redeem`,
    {
      method: "POST",
      headers: getHeaders(apiKey)
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
  redeemChannelTickets
};
