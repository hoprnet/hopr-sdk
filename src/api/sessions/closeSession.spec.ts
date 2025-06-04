import { sdkApiError } from '../../utils';
import { closeSession } from './closeSession';
import {
  RemoveBasicAuthenticationPayloadType,
  CloseSessionPayloadCallType,
  CloseSessionPayloadType
} from '../../types';
import nock from 'nock';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const API_TOKEN_INVALID = 'my-invalid-api-token';
const protocol = 'udp';
const listeningIp = '127.0.0.1';
const port = 9999;

const payload = {
  apiEndpoint: API_ENDPOINT,
  apiToken: API_TOKEN,
  protocol,
  listeningIp,
  port
} as CloseSessionPayloadType;

describe('closeSession', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return 204 if session is removed successfully', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(204);

    const response = await closeSession(payload);
    expect(response).toBe(true);
  });

  test('should return 401 if authentication failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(401, expectedResponse);

    await expect(closeSession(payload)).rejects.toThrow(sdkApiError);
  });

  test('should return 403 if authorization failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(403, expectedResponse);
    await expect(closeSession(payload)).rejects.toThrow(sdkApiError);
  });

  test('should return 422 if unknown failure occurred', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(422, expectedResponse);

    await expect(closeSession(payload)).rejects.toThrow(sdkApiError);
  });
});
