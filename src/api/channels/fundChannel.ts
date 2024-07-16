import { ZodError } from 'zod';
import {
  FundChannelsResponse,
  type FundChannelsPayloadType,
  type FundChannelsResponseType,
  type RemoveBasicAuthenticationPayloadType,
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
    `api/v3/channels/${payload.channelId}/fund`,
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

  let jsonResponse: any;

  try {
    jsonResponse = await rawResponse.json();
  } catch (e) {
    throw new sdkApiError({
      httpStatus: rawResponse.status,
      statusText: rawResponse.statusText,
      error: 'Failed parsing response'
    });
  }
  const parsedRes = FundChannelsResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      httpStatus: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      error: isApiErrorResponse.data?.error
    });
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
