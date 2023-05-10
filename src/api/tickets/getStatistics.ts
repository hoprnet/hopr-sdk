import fetch from 'cross-fetch';
import { Error } from '../../types';
import {
  GetStatisticsResponse,
  GetStatisticsResponseType
} from '../../types/tickets';
import { APIError, getHeaders } from '../../utils';

export const getStatistics = async (
  url: string,
  apiKey: string
): Promise<GetStatisticsResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/tickets/statistics`, {
    method: 'GET',
    headers: getHeaders(apiKey)
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
