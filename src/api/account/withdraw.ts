import fetch from 'cross-fetch';
import { getHeaders } from '../utils';

/**
 * Withdraw the given currency amount to the specified recipient address.
 *
 * @param url - The API endpoint URL.
 * @param apiKey - The API key used to authenticate the request.
 * @param currency - The currency symbol or code of the currency to withdraw.
 * @param amount - The amount of currency to withdraw.
 * @param recipient - The recipient address to which the funds will be sent.
 * @returns A Promise that resolves to the transaction receipt if successful, or an object containing a `status` and `error` field if unsuccessful.
 */
export const withdraw = async (
  url: string,
  apiKey: string,
  currency: string,
  amount: string,
  recipient: string
): Promise<string | { status?: string; error?: string }> => {
  // Fetch and check error responses
  const res = await fetch(`${url}/api/v2/account/withdraw`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify({ currency, amount, recipient })
  });

  const response = (await res.json()) as {
    receipt?: string;
    status?: string;
    error?: string;
  };
  if (response['receipt']) return response['receipt'];
  return { status: response['status'], error: response['error'] };
};
