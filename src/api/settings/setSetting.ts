import { Error, SetSettingPayloadType } from '../../types';
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

  if (rawResponse.status === 204) {
    return true;
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
