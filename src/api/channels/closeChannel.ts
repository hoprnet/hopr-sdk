import fetch from 'cross-fetch';
import {
  CloseChannelResponse,
  type CloseChannelResponseType,
  type CloseChannelPayloadType,
  APIErrorResponse
} from '../../types';
import { APIError, getHeaders } from '../../utils';
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
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetch(
    `${apiEndpointParsed}api/v2/channels/${payload.peerId}/${payload.direction}`,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiToken)
    }
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = CloseChannelResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
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
