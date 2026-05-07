import { ApiErrorResponse, type BasePayloadType } from '../../types';
import {
  GetTicketStatisticsResponse,
  GetTicketStatisticsResponseType
} from '../../types/tickets';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getTicketStatistics = async (
  payload: BasePayloadType
): Promise<GetTicketStatisticsResponseType> => {
  const url = new URL(`api/v4/tickets/statistics`, payload.apiEndpoint);
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

  const parsedRes = GetTicketStatisticsResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    const strip = (v: string) =>
      v.includes(' ') ? (v.split(' ')[0] as string) : v;
    return {
      neglectedValue: strip(parsedRes.data.neglectedValue),
      redeemedValue: parsedRes.data.redeemedValue
        ? strip(parsedRes.data.redeemedValue)
        : undefined,
      rejectedValue: strip(parsedRes.data.rejectedValue),
      unredeemedValue: strip(parsedRes.data.unredeemedValue),
      winningCount: parsedRes.data.winningCount
    };
  }
  throw parsedRes.error;
};
