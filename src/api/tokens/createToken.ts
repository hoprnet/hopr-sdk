import { ZodError } from 'zod';
import {
  type CreateTokenPayloadType,
  CreateTokenResponse,
  type CreateTokenResponseType,
  type RemoveBasicAuthenticationPayloadType,
  APIErrorResponse
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Create a new authentication token based on the given information.
 * The new token is returned as part of the response body and must be stored by the client.
 * It cannot be read again in cleartext and is lost, if the client loses the token.
 * An authentication has a lifetime. It can be unbound, meaning it will not expire.
 * Or it has a limited lifetime after which it expires.
 * The requested limited lifetime is requested by the client in seconds.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to be used for authentication.
 * @param body - The necessary data to create the token.
 * @returns A Promise that resolves to the generated token which must be used when authenticating for API calls.
 * @throws An error that occurred while processing the request.
 */
export const createToken = async (
  payload: CreateTokenPayloadType
): Promise<CreateTokenResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<CreateTokenPayloadType> = {
    capabilities: payload.capabilities,
    description: payload.description,
    lifetime: payload.lifetime
  };

  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v3/tokens`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = CreateTokenResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
