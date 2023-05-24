import { BasePayloadType, Error } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Disclaimer: takes really long to succeed
 */
export const redeemTickets = async (
  payload: BasePayloadType
): Promise<boolean> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/tickets/redeem`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

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
