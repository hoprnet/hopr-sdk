import fetch from 'cross-fetch';
import {
  BasicAuthenticationPayloadType,
  Error,
  GetSettingsResponse,
  GetSettingsResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getSettings = async (
  payload: BasicAuthenticationPayloadType
): Promise<GetSettingsResponseType> => {
  const rawResponse = await fetch(`${payload.url}/api/v2/settings`, {
    method: 'GET',
    headers: getHeaders(payload.apiKey)
  });

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
