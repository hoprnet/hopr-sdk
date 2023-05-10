import fetch from 'cross-fetch';
import { getHeaders } from '../utils';
import { withdrawPayloadType, Error } from '../../types';
import { APIError } from '../../utils';

/**
 * Withdraw the given currency amount to the specified recipient address.
 *
 * @param url - The API endpoint URL.
 * @param apiKey - The API key used to authenticate the request.
 * @param body - The necessary data to withdraw from a node;
 * @returns A Promise that resolves to the transaction receipt.
 * @throws An error that occurred while processing the request.
 */
export const withdraw = async (
  url: string,
  apiKey: string,
  body: withdrawPayloadType
): Promise<string> => {
  // Fetch and check error responses
  const rawResponse = await fetch(`${url}/api/v2/account/withdraw`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  if (rawResponse.status === 200) {
    return jsonResponse.receipt;
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
