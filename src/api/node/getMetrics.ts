import { ZodError } from 'zod';
import { BasePayloadType, APIErrorResponse } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getMetrics = async (payload: BasePayloadType): Promise<string> => {
  const headersForMetrics = getHeaders(payload.apiToken);
  headersForMetrics.set('Accept-Content', 'text/plain');

  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/node/metrics`,
    {
      method: 'GET',
      headers: headersForMetrics
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 204) {
    return rawResponse.text();
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
