import fetch from 'cross-fetch';
import { Error, GetInfoResponse, GetInfoResponseType } from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getInfo = async (
  url: string,
  apiKey: string
): Promise<GetInfoResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/node/info`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetInfoResponse.safeParse(jsonResponse);

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
