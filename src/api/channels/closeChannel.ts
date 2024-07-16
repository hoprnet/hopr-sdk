import {
  CloseChannelResponse,
  type CloseChannelResponseType,
  type CloseChannelPayloadType,
  ApiErrorResponse
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';
import { ZodError } from 'zod';

/**
 * Closes a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId and the direction of the channel.
 *
 * This operation may take more than 5 minutes to complete as it involves on-chain operations.
 *
 * @returns A Promise that resolves with the response of the close channel operation.
 * @throws APIError - If the operation fails. The error object contains the status code and the error message.
 */
export const closeChannel = async (
  payload: CloseChannelPayloadType
): Promise<CloseChannelResponseType> => {
  const url = new URL(
    `api/v3/channels/${payload.channelId}`,
    payload.apiEndpoint
  );
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  let jsonResponse: any;

  try {
    jsonResponse = await rawResponse.json();
  } catch (e) {
    throw new sdkApiError({
      httpStatus: rawResponse.status,
      statusText: rawResponse.statusText,
      error: `HTTP Status ${rawResponse.status}`
    });
  }
  const parsedRes = CloseChannelResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      httpStatus: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      error: isApiErrorResponse.data?.error
    });
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
