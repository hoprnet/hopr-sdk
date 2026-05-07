import {
  ApiErrorResponse,
  BasePayloadType,
  GetConnectedResponse,
  GetConnectedResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getConnected = async (
  payload: BasePayloadType
): Promise<GetConnectedResponseType> => {
  const url = new URL(`api/v4/network/connected`, payload.apiEndpoint);
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

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetConnectedResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the response and it is unexpected
  throw parsedRes.error;
};
