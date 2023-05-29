import { APIError, fetchWithTimeout, getHeaders } from '../../utils';
import {
  GetPeerInfoPayloadType,
  GetPeerInfoResponse,
  GetPeerInfoResponseType,
  Error
} from '../../types';

export const getPeerInfo = async (
  payload: GetPeerInfoPayloadType
): Promise<GetPeerInfoResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/peerInfo/${payload.peerId}`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetPeerInfoResponse.safeParse(jsonResponse);

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
