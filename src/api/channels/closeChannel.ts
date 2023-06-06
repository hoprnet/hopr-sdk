import fetch from 'cross-fetch';
import {
  CloseChannelResponse,
  CloseChannelResponseType,
  Error,
  type CloseChannelPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

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
