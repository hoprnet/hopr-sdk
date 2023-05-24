import { ExtendedBasicPayloadType, Error } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getMetrics = async (
  payload: ExtendedBasicPayloadType
): Promise<string> => {
  const headersForMetrics = getHeaders(payload.apiKey);
  headersForMetrics.set('Accept-Content', 'text/plain');

  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/node/metrics`,
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
