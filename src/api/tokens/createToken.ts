import {
  CreateTokenPayloadType,
  CreateTokenResponse,
  CreateTokenResponseType,
  Error,
  RemoveBasicAuthenticationPayloadType
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
 * @param url - The URL of the API endpoint.
 * @param apiKey - The API key to be used for authentication.
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

  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/tokens`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiKey),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();
  const parsedRes = CreateTokenResponse.safeParse(jsonResponse);
  if (parsedRes.success) {
    return parsedRes.data;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    throw new APIError(Error.parse(jsonResponse));
  }
};
