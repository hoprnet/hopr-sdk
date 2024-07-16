import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  BasePayloadType,
  GetEntryNodesResponse,
  GetEntryNodesResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getEntryNodes = async (
  payload: BasePayloadType
): Promise<GetEntryNodesResponseType> => {
  const url = new URL(`api/v3/node/entryNodes`, payload.apiEndpoint);
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
  const parsedRes = GetEntryNodesResponse.safeParse(jsonResponse);

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
