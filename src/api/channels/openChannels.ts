import fetch from 'cross-fetch';
import {
  Error,
  OpenChannelsResponse,
  OpenChannelsResponseType,
  type OpenChannelsPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

/**
 * Opens a HOPR channel given a payload that specifies the URL of the HOPR node, the peerId, and the amount of HOPR tokens to be staked in the channel.
 *
 * This operation may take more than 5 minutes to complete as it involves on-chain operations.
 *
 * @returns A Promise that resolves with the response of the open channel operation.
 * @throws APIError - If the operation fails. The error object contains the status code and the error message.
 */
export const openChannels = async (
  payload: OpenChannelsPayloadType
): Promise<OpenChannelsResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<OpenChannelsPayloadType> = {
    amount: payload.amount,
    peerId: payload.peerId
  };

  const rawResponse = await fetch(`${payload.url}/api/v2/channels`, {
    method: 'POST',
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = OpenChannelsResponse.safeParse(jsonResponse);

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
