import fetch from 'cross-fetch';
import {
  OpenChannelResponse,
  OpenChannelResponseType,
  type OpenChannelPayloadType,
  RemoveBasicAuthenticationPayloadType,
  APIErrorResponse
} from '../../types';
import { APIError, getHeaders } from '../../utils';
import { ZodError } from 'zod';

/**
 * Opens a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId, and the amount of HOPR tokens to be staked in the channel.
 *
 * This operation may take more than 5 minutes to complete as it involves on-chain operations.
 *
 * @returns A Promise that resolves with the response of the open channel operation.
 * @throws APIError - If the operation fails. The error object contains the status code and the error message.
 */
export const openChannel = async (
  payload: OpenChannelPayloadType
): Promise<OpenChannelResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<OpenChannelPayloadType> = {
    amount: payload.amount,
    peerId: payload.peerId
  };

  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetch(`${apiEndpointParsed}api/v3/channels`, {
    method: 'POST',
    headers: getHeaders(payload.apiToken),
    body: JSON.stringify(body)
  });

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = OpenChannelResponse.safeParse(jsonResponse);

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
