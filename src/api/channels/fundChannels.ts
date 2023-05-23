import fetch from 'cross-fetch';
import {
  Error,
  FundChannelsResponse,
  type FundChannelsPayloadType,
  type FundChannelsResponseType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const fundChannels = async (
  payload: FundChannelsPayloadType
): Promise<FundChannelsResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<FundChannelsPayloadType> = {
    incomingAmount: payload.incomingAmount,
    outgoingAmount: payload.outgoingAmount,
    peerId: payload.peerId
  };

  const rawResponse = await fetch(`${payload.url}/api/v2/fundmulti`, {
    method: 'POST',
    headers: getHeaders(payload.apiKey),
    body: JSON.stringify(body)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = FundChannelsResponse.safeParse(jsonResponse);

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
