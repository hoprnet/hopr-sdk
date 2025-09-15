import nock from 'nock';
import { updateSessionConfig } from './updateSessionConfig';
import { sdkApiError } from '../../utils';
import {
  RemoveBasicAuthenticationPayloadType,
  OpenSessionResponseType,
  OpenSessionPayloadCallType,
  UpdateSessionConfigCallType,
  GetSessionConfigPayloadResponseType
} from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const API_TOKEN_INVALID = 'my-invalid-api-token';
const BUDDY_NODE_ADDRESS = '0x3262f13a39efaca789ae58390441c9ed76bc658a';
const SESSION_ID = 'abc:123';

const body: GetSessionConfigPayloadResponseType = {
  maxSurbUpstream: '2 Mbps',
  responseBuffer: '2 MB'
};

describe('updateSessionConfig function', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test('update session configuration - should return 204 if successful', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(204);

    const result = await updateSessionConfig({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      sessionId: SESSION_ID,
      ...body
    });
    expect(result).toEqual(true);
  });

  test('should return 400 if invalid node address was provided', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(400, { status: 'INVALID_ERROR' });

    await expect(
      updateSessionConfig({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 401 if authentication failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(401, expectedResponse);

    await expect(
      updateSessionConfig({
        apiToken: API_TOKEN_INVALID,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
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
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(403, expectedResponse);

    await expect(
      updateSessionConfig({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 409 if listening address and port already in use.', async function () {
    const expectedResponse = {
      status: 'INVALID_INPUT',
      error: 'Listening address and port already in use.'
    };
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(409, expectedResponse);

    await expect(
      updateSessionConfig({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 422 if unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(422, expectedResponse);

    await expect(
      updateSessionConfig({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });
});
