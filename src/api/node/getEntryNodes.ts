import fetch from 'cross-fetch';
import {
  BasicAuthenticationPayloadType,
  Error,
  GetEntryNodesResponse,
  GetEntryNodesResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getEntryNodes = async (
  payload: BasicAuthenticationPayloadType
): Promise<GetEntryNodesResponseType> => {
  const rawResponse = await fetch(`${payload.url}/api/v2/node/entryNodes`, {
    method: 'GET',
    headers: getHeaders(payload.apiKey)
  });

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
