import { ZodError } from 'zod';
import {
  APIErrorResponse,
  IsNodeHealthyPayloadType,
  IsNodeHealthyResponse,
  IsNodeHealthyResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Check whether the node is healthy.
 * @returns A Promise that resolves to a boolean stating that the node is healthy or not.
 * @throws An error that occurred while processing the request.
 */
export const isNodeStarted = async (
  payload: IsNodeHealthyPayloadType
): Promise<IsNodeHealthyResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}startedz`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // received expected response
  if (rawResponse.status === 200) {
    return true;
  } else if (rawResponse.status === 412) {
    return false;
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  throw new APIError({ status: 'Unexpected error' });
};
