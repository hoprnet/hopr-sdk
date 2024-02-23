import { ZodError } from 'zod';
import { APIErrorResponse, DeleteMessagesPayloadType } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const deleteMessages = async (
  payload: DeleteMessagesPayloadType
): Promise<boolean> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const urlWithApiPath = new URL('api/v3/messages', apiEndpointParsed);
  const params = new URLSearchParams();
  // add tag to search params
  if(payload.tag) params.append('tag', payload.tag.toString());

  // join base url with search params
  urlWithApiPath.search = params.toString();

  const fullUrl = urlWithApiPath.toString();

  const rawResponse = await fetchWithTimeout(
    fullUrl,
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
