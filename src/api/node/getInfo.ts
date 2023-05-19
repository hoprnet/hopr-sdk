import fetch from 'cross-fetch';
import {
  BasicAuthenticationPayloadType,
  Error,
  GetInfoResponse,
  GetInfoResponseType
} from '../../types';
import { APIError, getHeaders } from '../../utils';

export const getInfo = async (
  payload: BasicAuthenticationPayloadType
): Promise<GetInfoResponseType> => {
  const rawResponse = await fetch(`${payload.url}/api/v2/node/info`, {
    method: 'GET',
    headers: getHeaders(payload.apiKey)
  });

  const jsonResponse = await rawResponse.json();

  const parsedRes = GetInfoResponse.safeParse(jsonResponse);

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
