import { sdkApiError } from '../../utils';
import { closeSession } from './closeSession';
import {
  RemoveBasicAuthenticationPayloadType,
  CloseSessionPayloadCallType
} from '../../types';
import nock from 'nock';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const API_TOKEN_INVALID = 'my-invalid-api-token';
const PROTOCOL = 'udp';

const body: RemoveBasicAuthenticationPayloadType<CloseSessionPayloadCallType> =
  {
    listeningIp: '127.0.0.1',
    port: 9999
  };

describe('closeSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return 204 if session is removed successfully', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/session/${PROTOCOL}`, body).reply(204);

    const response = await closeSession({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      protocol: PROTOCOL,
      ...body
    });
    expect(response).toBe(true);
  });

  test('should return 401 if authentication failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v3/session/${PROTOCOL}`, body)
      .reply(401, expectedResponse);

    await expect(
      closeSession({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN_INVALID,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 403 if authorization failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v3/session/${PROTOCOL}`, body)
      .reply(403, expectedResponse);
    await expect(
      closeSession({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 422 if unknown failure occurred', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v3/session/${PROTOCOL}`, body)
      .reply(422, expectedResponse);

    await expect(
      closeSession({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });
});
