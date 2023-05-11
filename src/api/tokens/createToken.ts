import fetch from 'cross-fetch';
import { APIError, getHeaders } from '../../utils';
import {
  createPayloadType,
  createResponse,
  createResponseType,
  Error
} from '../../types';

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
export const create = async (
  url: string,
  apiKey: string,
  body: createPayloadType
): Promise<createResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/tokens`, {
    method: 'POST',
    headers: getHeaders(apiKey),
    body: JSON.stringify(body)
  });
  const jsonResponse = await rawResponse.json();
  const parsedRes = createResponse.safeParse(jsonResponse);
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
