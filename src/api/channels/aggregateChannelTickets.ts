import {
  ApiErrorResponse,
  AggregateChannelTicketsPayloadType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';
import { ZodError } from 'zod';

/**
 * Takes all acknowledged and winning tickets (if any) from the given channel and aggregates them into a single ticket. Requires cooperation of the ticket issuer.
 *
 * @returns A Promise that resolves to a boolean indicating the success of the operation.
 * True if the operation is successful, false otherwise.
 *
 * @throws APIError - If the operation fails. The error object contains the status code and the error message.
 */
export const aggregateChannelTickets = async (
  payload: AggregateChannelTicketsPayloadType
): Promise<boolean> => {
  const url = new URL(
    `api/v3/channels/${payload.channelId}/tickets/aggregate`,
    payload.apiEndpoint
  );
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 204) {
    return true;
  }

  // received unexpected error from server
  if (rawResponse.status >= 499) {
    throw new Error(rawResponse.statusText);
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
