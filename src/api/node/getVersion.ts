import { ZodError } from 'zod';
import { ApiErrorResponse, type BasePayloadType } from '../../types';
import { sdkApiError, fetchWithTimeout, getHeaders } from '../../utils';

export const getVersion = async (payload: BasePayloadType): Promise<string> => {
  const url = new URL(`api/v3/node/version`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 200) {
    const jsonResponse = await rawResponse.json();
    return jsonResponse.version as string;
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = ApiErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new sdkApiError({
      status: rawResponse.status,
      statusText: isApiErrorResponse.data.status,
      hoprdErrorPayload: isApiErrorResponse.data
    });
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
