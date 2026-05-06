import {
  ApiErrorResponse,
  BasePayloadType,
  GetAnnouncedResponse,
  GetAnnouncedResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getAnnounced = async (
  payload: BasePayloadType
): Promise<GetAnnouncedResponseType> => {
  const url = new URL(`api/v4/network/announced`, payload.apiEndpoint);
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
  const parsedRes = GetAnnouncedResponse.safeParse(jsonResponse);

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
