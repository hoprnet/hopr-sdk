import {
  Error,
  PingNodePayloadType,
  PingNodeResponse,
  PingNodeResponseType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

export const pingNode = async (
  payload: PingNodePayloadType
): Promise<PingNodeResponseType> => {
  const body: RemoveBasicAuthenticationPayloadType<PingNodePayloadType> = {
    peerId: payload.peerId
  };
  const apiEndpointParsed = new URL(payload.apiEndpoint).href;
  const rawResponse = await fetchWithTimeout(
    `${apiEndpointParsed}api/v2/node/ping`,
    {
      method: 'POST',
      headers: getHeaders(payload.apiToken),
      body: JSON.stringify(body)
    },
    payload.timeout
  );

  const jsonResponse = await rawResponse.json();

  const parsedRes = PingNodeResponse.safeParse(jsonResponse);

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
