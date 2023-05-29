import fetch from 'cross-fetch';
import { BasePayloadType, Error } from '../../types';
import { APIError, getHeaders } from '../../utils';

/**
 * Redeems all the unredeemed HOPR tickets owned by the HOPR node.
 *
 * This operation may take more than 5 minutes to complete as it involves on-chain operations.
 * @returns A Promise that resolves to a boolean indicating the success of the operation.
 * True if the operation is successful, false otherwise.
 *
 * @throws APIError - If the operation fails. The error object contains the status code and the error message.
 */
export const redeemTickets = async (
  payload: BasePayloadType
): Promise<boolean> => {
  const rawResponse = await fetch(
    `${payload.apiEndpoint}/api/v2/tickets/redeem`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken)
    }
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
