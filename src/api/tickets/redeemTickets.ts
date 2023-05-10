import fetch from 'cross-fetch';
import { Error, GetTicketsResponse, GetTicketsResponseType } from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getStatistics = async (
  url: string,
  apiKey: string
): Promise<boolean> => {
  const rawResponse = await fetch(`${url}/api/v2/tickets/redeem`, {
    method: 'POST',
    headers: getHeaders(apiKey)
  });

  if (rawResponse.status === 204) {
    return true;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};
