import { ZodError } from 'zod';
import { BasePayloadType, ApiErrorResponse } from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getMetrics = async (payload: BasePayloadType): Promise<string> => {
  const headersForMetrics = getHeaders(payload.apiToken);
  headersForMetrics.set('accept', 'text/plain');

  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}metrics`,
    {
      method: 'GET',
      headers: headersForMetrics
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 200) {
    return rawResponse.text();
  }

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};