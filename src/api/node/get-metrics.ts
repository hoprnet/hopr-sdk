import fetch from 'cross-fetch';
import { Error, GetMetricsResponse, GetMetricsResponseType } from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getMetrics = async (
  url: string,
  apiKey: string
): Promise<GetMetricsResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/node/metrics`, {
    method: 'GET',
    headers: { ...getHeaders(apiKey), 'Accept-Content': 'text/plain' }
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetMetricsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    // server error that was unexpected
    if (rawResponse.status > 499)
      throw new APIError({
        status: rawResponse.status.toString(),
        error: rawResponse.statusText
      });
    throw new APIError(Error.parse(jsonResponse));
  }
};
