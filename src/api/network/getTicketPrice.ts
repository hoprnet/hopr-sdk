import {
  ApiErrorResponse,
  GetTicketPricePayloadType,
  GetTicketPriceResponse,
  GetTicketPriceResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getTicketPrice = async (
  payload: GetTicketPricePayloadType
): Promise<GetTicketPriceResponseType> => {
  const url = new URL(`api/v4/network/price`, payload.apiEndpoint);
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

  // any non-2xx response is an error path
  if (!rawResponse.ok) {
    const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);
    if (isApiErrorResponse.success) {
      throw new sdkApiError({
        status: rawResponse.status,
        statusText: isApiErrorResponse.data.status,
        hoprdErrorPayload: isApiErrorResponse.data
      });
    }
    throw isApiErrorResponse.error;
  }

  const parsedRes = GetTicketPriceResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    parsedRes.data.price = parsedRes.data.price.includes(' ')
      ? (parsedRes.data.price.split(' ')[0] as string)
      : parsedRes.data.price;
    return parsedRes.data;
  }
  throw parsedRes.error;
};
