import { BasePayloadType, Error } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getVersion = async (payload: BasePayloadType): Promise<string> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/node/version`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

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
