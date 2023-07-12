import fetch from 'cross-fetch';
import {
  APIErrorResponse,
  RemoveBasicAuthenticationPayloadType,
  WithdrawPayloadType,
  WithdrawResponse
} from '../../types';
import { APIError, getHeaders } from '../../utils';
import { ZodError } from 'zod';

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
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetch(
    `${apiEndpointParsed}api/v3/account/withdraw`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify({ body })
    }
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = WithdrawResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data.receipt;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
