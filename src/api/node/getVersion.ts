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
  } // server error that was unexpected
  else if (rawResponse.status > 499) {
    throw new APIError({
      status: rawResponse.status.toString(),
      error: rawResponse.statusText
    });
  } else {
    // response is neither successful nor unexpected
    const jsonResponse = await rawResponse.json();
    throw new APIError(Error.parse(jsonResponse));
  }
};
