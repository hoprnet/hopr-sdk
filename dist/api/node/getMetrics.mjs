import fetch from "cross-fetch";
import { Error } from "../../types";
import { APIError, getHeaders } from "../../utils";
const getMetrics = async (payload) => {
  const headersForMetrics = getHeaders(payload.apiKey);
  headersForMetrics.set("Accept-Content", "text/plain");
  const rawResponse = await fetch(`${payload.url}/api/v2/node/metrics`, {
    method: "GET",
    headers: headersForMetrics
  });
  if (rawResponse.status === 200) {
    const textResponse = await rawResponse.text();
    return textResponse;
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
  getMetrics
};
