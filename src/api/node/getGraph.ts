import { ZodError } from 'zod';
import {
  ApiErrorResponse,
  GetGraphPayloadType,
  GetGraphResponse,
  GetGraphResponseType
} from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getGraph = async (
  payload: GetGraphPayloadType
): Promise<GetGraphResponseType> => {

  const {
    ignoreDisconnectedComponents,
    ignoreNonOpenedChannels,
    rawGraph
  } = payload;

  const params = [
    ignoreDisconnectedComponents !== undefined ? `ignoreDisconnectedComponents=${ignoreDisconnectedComponents}` : null,
    ignoreNonOpenedChannels !== undefined ? `ignoreNonOpenedChannels=${ignoreNonOpenedChannels}` : null,
    rawGraph !== undefined ? `rawGraph=${rawGraph}` : null,
  ].filter(elem => !!elem);

  const url = new URL(`api/v3/node/graph?${params.join('&')}`, payload.apiEndpoint);

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

  const textResponse = await rawResponse.text();
  let jsonResponse = null;
  try {
    jsonResponse = JSON.parse(textResponse);
  } catch (e){
    // If it fails, it doesn't mean the function failed as it can return json as a string or a string
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

  const parsedRes = GetGraphResponse.safeParse(textResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // we could not parse the response and it is unexpected
  throw new ZodError(parsedRes.error.issues);
};
