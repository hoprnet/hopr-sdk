import { BasePayloadType, Error } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getMetrics = async (payload: BasePayloadType): Promise<string> => {
  const headersForMetrics = getHeaders(payload.apiToken);
  headersForMetrics.set('Accept-Content', 'text/plain');

  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/node/metrics`,
    {
      method: 'GET',
      headers: headersForMetrics
    },
    payload.timeout
  );

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
