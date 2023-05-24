import {
  BasePayloadType,
  Error,
  GetEntryNodesResponse,
  GetEntryNodesResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getEntryNodes = async (
  payload: BasePayloadType
): Promise<GetEntryNodesResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/node/entryNodes`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetEntryNodesResponse.safeParse(jsonResponse);

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
