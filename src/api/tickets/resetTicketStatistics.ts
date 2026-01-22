import { ZodError } from 'zod';
import { ApiErrorResponse, type BasePayloadType } from '../../types';
import {
  ResetTicketStatisticsResponse,
  ResetTicketStatisticsResponseType
} from '../../types/tickets';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const resetTicketStatistics = async (
  payload: BasePayloadType
): Promise<ResetTicketStatisticsResponseType> => {
  const url = new URL(`api/v4/tickets/statistics`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 204) {
    return true;
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

  // we could not parse the response and it is unexpected
  throw isApiErrorResponse.error;
};
