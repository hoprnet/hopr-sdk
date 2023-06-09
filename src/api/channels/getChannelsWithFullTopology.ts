import fetch from 'cross-fetch';
import {
  Error,
  BasePayloadType,
  GetChannelsWithFullTopologyResponse,
  GetChannelsWithFullTopologyResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

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

  const jsonResponse = await rawResponse.json();
  const parsedRes = GetChannelsWithFullTopologyResponse.safeParse(jsonResponse);

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
