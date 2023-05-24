import { ExtendedBasicPayloadType, Error } from '../../types';
import {
  GetStatisticsResponse,
  GetStatisticsResponseType
} from '../../types/tickets';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getStatistics = async (
  payload: ExtendedBasicPayloadType
): Promise<GetStatisticsResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/tickets/statistics`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

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
