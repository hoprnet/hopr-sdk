import fetch from 'cross-fetch';
import { BasicAuthenticationPayloadType, Error } from '../../types';
import {
  GetStatisticsResponse,
  GetStatisticsResponseType
} from '../../types/tickets';
import { APIError, getHeaders } from '../../utils';

export const getStatistics = async (
  payload: BasicAuthenticationPayloadType
): Promise<GetStatisticsResponseType> => {
  const rawResponse = await fetch(`${payload.url}/api/v2/tickets/statistics`, {
    method: 'GET',
    headers: getHeaders(payload.apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetStatisticsResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    throw new APIError(Error.parse(jsonResponse));
  }
};
