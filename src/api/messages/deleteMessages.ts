import { ZodError } from 'zod';
import { APIErrorResponse, DeleteMessagesPayloadType } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const deleteMessages = async (
  payload: DeleteMessagesPayloadType
): Promise<boolean> => {
  const url = new URL('api/v3/messages', payload.apiEndpoint);
  if (payload.tag) {
    url.searchParams.set('tag', payload.tag.toString());
  }

  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'DELETE',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 204) {
    return true;
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
