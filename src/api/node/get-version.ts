import fetch from 'cross-fetch';
import { Error, GetVersionResponse, GetVersionResponseType } from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getVersion = async (
  url: string,
  apiKey: string
): Promise<GetVersionResponseType> => {
  const rawResponse = await fetch(`${url}/api/v2/node/version`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetVersionResponse.safeParse(jsonResponse);

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
