import {
  ExtendedBasicPayloadType,
  Error,
  GetSettingsResponse,
  GetSettingsResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const getSettings = async (
  payload: ExtendedBasicPayloadType
): Promise<GetSettingsResponseType> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.url}/api/v2/settings`,
    {
      method: 'GET',
      headers: getHeaders(payload.apiKey)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetSettingsResponse.safeParse(jsonResponse);

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
