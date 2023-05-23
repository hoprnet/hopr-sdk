import fetch from "cross-fetch";
import { Error } from "../../types";
import {
  GetStatisticsResponse
} from "../../types/tickets";
import { APIError, getHeaders } from "../../utils";
const getStatistics = async (url, apiKey) => {
  const rawResponse = await fetch(`${url}/api/v2/tickets/statistics`, {
    method: "GET",
    headers: getHeaders(apiKey)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = GetStatisticsResponse.safeParse(jsonResponse);
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
  getStatistics
};