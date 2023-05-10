import fetch from 'cross-fetch';
import { Error } from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getMetrics = async (
  url: string,
  apiKey: string
): Promise<string> => {
  const headersForMetrics = getHeaders(apiKey);
  headersForMetrics.set('Accept-Content', 'text/plain');

  const rawResponse = await fetch(`${url}/api/v2/node/metrics`, {
    method: 'GET',
    headers: headersForMetrics
  });

  if (rawResponse.status === 200) {
    const textResponse = await rawResponse.text();
    return textResponse;
  } // server error that was unexpected
  else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};
