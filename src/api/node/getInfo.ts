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
