import fetch from 'cross-fetch';
import {
  BasePayloadType,
  GetChannelsWithFullTopologyResponse,
  GetChannelsWithFullTopologyResponseType,
  APIErrorResponse
} from '../../types';
import { APIError, getHeaders } from '../../utils';
import { ZodError } from 'zod';

/**
 * Gets all channels with full topology.
 *
 * This operation may take more than 5 minutes to complete.
 *
 * @returns A Promise that resolves with the response of all channels full topology.
 * @throws APIError - If the operation fails. The error object contains the status code and the error message.
 */
export const getChannelsWithFullTopology = async (
  payload: BasePayloadType
): Promise<GetChannelsWithFullTopologyResponseType> => {
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;

  const rawResponse = await fetch(
    `${apiEndpointParsed}api/v2/channels?fullTopology=true`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    }
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetChannelsWithFullTopologyResponse.safeParse(jsonResponse);

  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
