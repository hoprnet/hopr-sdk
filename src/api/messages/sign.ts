import {
  Error,
  RemoveBasicAuthenticationPayloadType,
  SignPayloadType,
  SignResponse
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Signs a message given using the node’s private key. Prefixes messsage with “HOPR Signed Message: ” before signing.
 *
 * @param apiEndpoint - The API endpoint.
 * @param apiToken - The API token to use for authentication.
 * @param message - The message to sign.
 * @returns A Promise that resolves to a string representing the signature.
 * @throws An error that occurred while processing the request.
 */
export const sign = async (payload: SignPayloadType): Promise<string> => {
  const body: RemoveBasicAuthenticationPayloadType<SignPayloadType> = {
    message: payload.message
  };
  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/messages/sign`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );
  const jsonResponse = await rawResponse.json();
  const parsedRes = SignResponse.safeParse(jsonResponse);

  if (rawResponse.status === 200 && parsedRes.success) {
    return parsedRes.data.signature;
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
