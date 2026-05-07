import {
  ApiErrorResponse,
  RemoveBasicAuthenticationPayloadType,
  WithdrawPayloadType,
  WithdrawResponse
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Withdraw the given currency amount to the specified recipient address.
 * This operation may take more than 5 minutes to complete as it involves on-chain operations.
 * @returns A Promise that resolves to the transaction receipt.
 * @throws An error that occurred while processing the request.
 */
export const withdraw = async (
  payload: WithdrawPayloadType
): Promise<string> => {
  const body: RemoveBasicAuthenticationPayloadType<WithdrawPayloadType> = {
    amount: payload.amount,
    address: payload.address
  };
  const url = new URL(`api/v4/account/withdraw`, payload.apiEndpoint);
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

  const jsonResponse = await rawResponse.json();

  // any non-2xx response is an error path
  if (!rawResponse.ok) {
    const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);
    if (isApiErrorResponse.success) {
      throw new sdkApiError({
        status: rawResponse.status,
        statusText: isApiErrorResponse.data.status,
        hoprdErrorPayload: isApiErrorResponse.data
      });
    }
    throw isApiErrorResponse.error;
  }

  const parsedRes = WithdrawResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    return parsedRes.data.receipt;
  }
  throw parsedRes.error;
};
