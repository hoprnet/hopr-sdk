import fetch from 'cross-fetch';
import {
  Error,
  GetEntryNodesResponse,
  GetEntryNodesResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getEntryNodes = async (
  url: string,
  apiKey: string
): Promise<GetEntryNodesResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/node/entryNodes`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetEntryNodesResponse.safeParse(jsonResponse);

  if (parsedRes.success) {
    return parsedRes.data;
  } else {
    // server error that was unexpected
    if (rawResponse.status > 499)
      throw new APIError({
        status: rawResponse.status.toString(),
        error: rawResponse.statusText
      });
    throw new APIError(Error.parse(jsonResponse));
  }
};
