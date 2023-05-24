import {
  ExtendedBasicPayloadType,
  Error,
  GetTicketsResponse,
  GetTicketsResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getTickets = async (
  payload: ExtendedBasicPayloadType
): Promise<GetTicketsResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/tickets`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetTicketsResponse.safeParse(jsonResponse);

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
