import fetch from 'cross-fetch';
import {
  Error,
  RemoveBasicAuthenticationPayloadType,
  WithdrawPayloadType,
  WithdrawResponse
} from '../../types';
import { APIError, getHeaders } from '../../utils';

/**
 * Withdraw the given currency amount to the specified recipient address.
 * This operation may take more than 5 minutes to complete as it involves on-chain operations.
 * @returns A Promise that resolves to the transaction receipt.
 * @throws An error that occurred while processing the request.
 */
export const withdraw = async (
  payload: WithdrawPayloadType
): Promise<string> => {
  // Fetch and check error responses
  const body: RemoveBasicAuthenticationPayloadType<WithdrawPayloadType> = {
    amount: payload.amount,
    currency: payload.currency,
    recipient: payload.recipient
  };
  const rawResponse = await fetch(`${payload.url}/api/v2/account/withdraw`, {
    method: 'POST',
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify({ body })
  });

  const jsonResponse = await rawResponse.json();
  const parsedRes = WithdrawResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    return parsedRes.data.receipt;
  } else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    throw new APIError(Error.parse(jsonResponse));
  }
};
