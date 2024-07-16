import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  IsNodeHealthyPayloadType,
  IsNodeHealthyResponse,
  IsNodeHealthyResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

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
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      httpStatus: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      error: isApiErrorResponse.data?.error
    });
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
