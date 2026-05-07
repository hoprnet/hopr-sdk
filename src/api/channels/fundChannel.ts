import {
  FundChannelsResponse,
  type FundChannelsPayloadType,
  type FundChannelsResponseType,
  ApiErrorResponse
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Funds an existing channel with the given amount. The channel must be in state OPEN
 */
export const fundChannel = async (
  payload: FundChannelsPayloadType
): Promise<FundChannelsResponseType> => {
  const body = {
    amount: payload.amount
  };

  const url = new URL(
    `api/v4/channels/${payload.address}/fund`,
    payload.apiEndpoint
  );
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: rawResponse.statusText
    });
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = FundChannelsResponse.safeParse(jsonResponse);

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
  throw parsedRes.error;
};
