import {
  ApiErrorResponse,
  type RedeemAllTicketsPayloadType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Redeems all the unredeemed HOPR tickets owned by the HOPR node.
 * Optionally scoped to a specific counterparty address.
 *
 * This operation may take more than 5 minutes to complete as it involves on-chain operations.
 * @returns A Promise that resolves to a boolean indicating the success of the operation.
 *
 * @throws APIError - If the operation fails. The error object contains the status code and the error message.
 */
export const redeemAllTickets = async (
  payload: RedeemAllTicketsPayloadType
): Promise<boolean> => {
  const url = new URL(`api/v4/tickets/redeem`, payload.apiEndpoint);
  const body: { address?: string | null } = {};
  if (payload.address !== undefined) {
    body.address = payload.address;
  }
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  // received expected response (202 Accepted)
  if (rawResponse.status === 202) {
    return true;
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the error and it is not unexpected
  throw isApiErrorResponse.error;
};
