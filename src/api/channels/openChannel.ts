import {
  OpenChannelResponse,
  OpenChannelResponseType,
  type OpenChannelPayloadType,
  RemoveBasicAuthenticationPayloadType,
  APIErrorResponse
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
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
    peerAddress: payload.peerAddress
  };

  const url = new URL(`api/v3/channels`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  let jsonResponse: any;

  try {
    jsonResponse = await rawResponse.json();
  } catch (e) {
    throw new APIError({
      status: rawResponse.status,
      statusText: rawResponse.statusText,
      error: `HTTP Status ${rawResponse.status}`
    });
  }

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
