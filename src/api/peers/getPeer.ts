import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  GetPeerPayloadType,
  GetPeerResponseType,
  GetPeerResponse
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getPeer = async (
  payload: GetPeerPayloadType
): Promise<GetPeerResponseType> => {
  let destination = '';
  if(payload.peerId) {
    console.warn('[HOPR SDK: pingPeer] peerId key is deprecated. Please use destination key');
    destination = payload.peerId;
  }
  if(payload.destination) {
    destination = payload.destination;
  }
  if(!payload.destination && !payload.peerId) {
    console.error('[HOPR SDK: pingPeer] Please provide destination');
  }

  const url = new URL(`api/v3/peers/${payload.peerId}`, payload.apiEndpoint);

  const rawResponse = await fetchWithTimeout(
    url,
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

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetPeerResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the response and it is unexpected
  throw new ZodError(parsedRes.error.issues);
};
