import { ZodError } from 'zod';
import {
  FundChannelsResponse,
  type FundChannelsPayloadType,
  type FundChannelsResponseType,
  type RemoveBasicAuthenticationPayloadType,
  APIErrorResponse
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const fundChannels = async (
  payload: FundChannelsPayloadType
): Promise<FundChannelsResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<FundChannelsPayloadType> = {
    incomingAmount: payload.incomingAmount,
    outgoingAmount: payload.outgoingAmount,
    peerId: payload.peerId
  };

  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/fundmulti`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = FundChannelsResponse.safeParse(jsonResponse);

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
