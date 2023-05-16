import fetch from 'cross-fetch';
import {
  BasicAuthenticationPayloadType,
  Error,
  GetTicketsResponse,
  GetTicketsResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getTickets = async (
  payload: BasicAuthenticationPayloadType
): Promise<GetTicketsResponseType> => {
  const rawResponse = await fetch(`${payload.url}/api/v2/tickets`, {
    method: 'GET',
    headers: getHeaders(payload.apiKey)
  });

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
