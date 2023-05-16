import fetch from 'cross-fetch';
import { BasicAuthenticationPayloadType, Error } from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getVersion = async (
  payload: BasicAuthenticationPayloadType
): Promise<string> => {
  const rawResponse = await fetch(`${payload.url}/api/v2/node/version`, {
    method: 'GET',
    headers: getHeaders(payload.apiKey)
  });

  if (rawResponse.status === 200) {
    const textResponse = await rawResponse.text();
    return textResponse;
  } else if (rawResponse.status > 499) {
    // server error that was unexpected
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
