import { ZodError } from 'zod';
import { APIErrorResponse, type BasePayloadType } from '../../types';
import {
  GetTicketStatisticsResponse,
  GetTicketStatisticsResponseType
} from '../../types/tickets';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getTicketStatistics = async (
  payload: BasePayloadType
): Promise<GetTicketStatisticsResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v3/tickets/statistics`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetTicketStatisticsResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};