import { ZodError } from 'zod';
import {
  APIErrorResponse,
  PingPeerPayloadType,
  PingPeerResponse,
  PingPeerResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const pingPeer = async (
  payload: PingPeerPayloadType
): Promise<PingPeerResponseType> => {
  const url = new URL(
    `api/v3/peers/${payload.peerId}/ping`,
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

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = PingPeerResponse.safeParse(jsonResponse);

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
