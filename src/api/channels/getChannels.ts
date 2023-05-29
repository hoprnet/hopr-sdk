import {
  BasePayloadType,
  Error,
  GetChannelsResponse,
  GetChannelsResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getChannels = async (
  payload: BasePayloadType
): Promise<GetChannelsResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/channels`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetChannelsResponse.safeParse(jsonResponse);

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
