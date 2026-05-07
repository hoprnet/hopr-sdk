import { ApiErrorResponse, GetNetworkGraphPayloadType } from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getGraph = async (
  payload: GetNetworkGraphPayloadType
): Promise<string> => {
  const url = new URL(`api/v4/network/graph`, payload.apiEndpoint);
  if (payload.reachableOnly !== undefined) {
    url.searchParams.set('reachableOnly', String(payload.reachableOnly));
  }
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  // received expected response (text/plain body)
  if (rawResponse.ok) {
    return rawResponse.text();
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
  throw isApiErrorResponse.error;
};
