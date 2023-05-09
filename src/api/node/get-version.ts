import fetch from 'cross-fetch';
import { Error } from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getVersion = async (
  url: string,
  apiKey: string
): Promise<string> => {
  const rawResponse = await fetch(`${url}/api/v2/node/version`, {
    method: 'GET',
    headers: getHeaders(apiKey)
  });

  if (rawResponse.status === 200) {
    const textResponse = await rawResponse.text();
    return textResponse;
  } else {
    const jsonResponse = await rawResponse.json();
    // server error that was unexpected
    if (rawResponse.status > 499)
      throw new APIError({
        status: rawResponse.status.toString(),
        error: rawResponse.statusText
      });
    throw new APIError(Error.parse(jsonResponse));
  }
};
