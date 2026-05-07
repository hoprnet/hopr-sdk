import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
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

const startHangingServer = async () => {
  nock.enableNetConnect('127.0.0.1');
  const server = http.createServer(() => {});
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve())
  );
  const port = (server.address() as any).port;
  const stop = async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    nock.disableNetConnect();
  };
  return { url: `http://127.0.0.1:${port}`, stop };
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

  test('should return 404 if session is not found', async function () {
    const expectedResponse = {
      status: 'SESSION_NOT_FOUND',
      error: 'Session not found.'
    };
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(404, expectedResponse);

    await expect(
      updateSessionConfig({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 406 if the configuration is not acceptable', async function () {
    const expectedResponse = {
      status: 'NOT_ACCEPTABLE',
      error: 'Configuration not acceptable.'
    };
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(406, expectedResponse);

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
  test('throws ZodError when error-path body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(400, { unexpected: 'shape' });

    let caught: any;
    try {
      await updateSessionConfig({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
        ...body
      });
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeDefined();
    expect(caught?.name).toBe('ZodError');
  });
  test('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        updateSessionConfig({
          apiToken: API_TOKEN,
          apiEndpoint: url,
          sessionId: SESSION_ID,
          ...body,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  test('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .replyWithError('ECONNREFUSED');

    await expect(
      updateSessionConfig({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
        ...body
      })
    ).rejects.toThrow();
  });
  test('rejects when error-path body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(400, 'not-json');

    await expect(
      updateSessionConfig({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        sessionId: SESSION_ID,
        ...body
      })
    ).rejects.toThrow();
  });
  test('does not parse a body on 204 success', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(204);

    const result = await updateSessionConfig({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      sessionId: SESSION_ID,
      ...body
    });
    expect(result).toBe(true);
  });
  test('throws sdkApiError when the api responds with a 500', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/session/config/${SESSION_ID}`, body)
      .reply(500, { status: 'INTERNAL_SERVER_ERROR' });

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
