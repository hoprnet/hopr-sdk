import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  GetTicketPricePayloadType,
  GetTicketPriceResponse,
  GetTicketPriceResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getTicketPrice = async (
  payload: GetTicketPricePayloadType
): Promise<GetTicketPriceResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v4/network/price`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status >= 500) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetTicketPriceResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    parsedRes.data.price = parsedRes.data.price.includes(' ')
      ? (parsedRes.data.price.split(' ')[0] as string)
      : parsedRes.data.price;
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
