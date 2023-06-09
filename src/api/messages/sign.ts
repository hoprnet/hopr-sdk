import { ZodError } from 'zod';
import {
  APIErrorResponse,
  type RemoveBasicAuthenticationPayloadType,
  type SignPayloadType,
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
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/messages/sign`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );
  const jsonResponse = await rawResponse.json();
  const parsedRes = SignResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data.signature;
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
