import {
  APIErrorResponse,
  type RedeemChannelTicketsPayloadType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
import { ZodError } from 'zod';

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
  payload: RedeemChannelTicketsPayloadType
): Promise<boolean> => {
  const url = new URL(
    `api/v3/channels/${payload.channelId}/tickets/redeem`,
    payload.apiEndpoint
  );
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 204) {
    return true;
  }

  // received unexpected error from server
  if (rawResponse.status >= 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
