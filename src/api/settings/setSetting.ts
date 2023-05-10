import fetch from 'cross-fetch';
import { APIError, getHeaders } from '../../utils';
import { SetSettingPayloadType, Error } from '../../types';

export const setSetting = async (
  url: string,
  apiKey: string,
  body: SetSettingPayloadType
): Promise<boolean> => {
  const rawResponse = await fetch(`${url}/api/v2/settings/${body.setting}`, {
    method: 'PUT',
    headers: getHeaders(apiKey),
    body: JSON.stringify({ settingValue: body.settingValue })
  });

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
