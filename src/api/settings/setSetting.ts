import { ZodError } from 'zod';
import { APIErrorResponse, type SetSettingPayloadType } from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const setSetting = async (
  payload: SetSettingPayloadType
): Promise<boolean> => {
  const rawResponse = await fetchWithTimeout(
    `${payload.apiEndpoint}/api/v2/settings/${payload.setting}`,
    {
      method: 'PUT',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify({ settingValue: payload.settingValue })
    },
    payload.timeout
  );

  // received expected response
  if (rawResponse.status === 204) {
    return true;
  }

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  // check if response has the structure of an expected api error
  const jsonResponse = await rawResponse.json();
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  // we could not parse the error and it is not unexpected
  throw new ZodError(isApiErrorResponse.error.issues);
};
