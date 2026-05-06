import {
  ApiErrorResponse,
  BasePayloadType,
  GetNodeStatusResponse,
  GetNodeStatusResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getStatus = async (
  payload: BasePayloadType
): Promise<GetNodeStatusResponseType> => {
  const url = new URL(`api/v4/node/status`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  if (rawResponse.status >= 500) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetNodeStatusResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  }

  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  throw parsedRes.error;
};
