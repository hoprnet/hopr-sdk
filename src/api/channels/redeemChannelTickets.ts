import fetch from 'cross-fetch';
import { Error, type PeerIdPayloadType } from '../../types';
import { APIError, getHeaders } from '../../utils';

/**
 * Redeems all the unredeemed HOPR tickets in a channel.
 *
 * This operation may take more than 5 minutes to complete as it involves on-chain operations.
 *
 * @returns A Promise that resolves to a boolean indicating the success of the operation.
 * True if the operation is successful, false otherwise.
 *
 * @throws APIError - If the operation fails. The error object contains the status code and the error message.
 */
export const redeemChannelTickets = async (
  payload: PeerIdPayloadType
): Promise<boolean> => {
  const rawResponse = await fetch(
    `${payload.apiEndpoint}/api/v2/channels/${payload.peerId}/tickets/redeem`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken)
    }
  );

  console.log(rawResponse.status);
  console.log('============= redeemChannelTickets =========');

  if (rawResponse.status === 204) {
    return true;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
    console.log(rawResponse);
    console.log(rawResponse.statusText);
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse);
    throw new APIError(Error.parse(jsonResponse));
  }
};
