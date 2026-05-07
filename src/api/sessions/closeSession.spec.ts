import { ZodError } from 'zod';
import http from 'http';
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

const startHangingServer = async () => {
  nock.enableNetConnect('127.0.0.1');
  const server = http.createServer(() => {});
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve())
  );
  const serverPort = (server.address() as any).port;
  const stop = async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    nock.disableNetConnect();
  };
  return { url: `http://127.0.0.1:${serverPort}`, stop };
};

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

  test('should return 400 if invalid input was provided', async function () {
    const expectedResponse = {
      status: 'INVALID_INPUT',
      error: 'Invalid input.'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(400, expectedResponse);

    await expect(closeSession(payload)).rejects.toThrow(sdkApiError);
  });

  test('should return 404 if session is not found', async function () {
    const expectedResponse = {
      status: 'SESSION_NOT_FOUND',
      error: 'Session not found.'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(404, expectedResponse);

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
  test('throws ZodError when error-path body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(400, { unexpected: 'shape' });

    let caught: any;
    try {
      await closeSession(payload);
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
        closeSession({ ...payload, apiEndpoint: url, timeout: 100 })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  test('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .replyWithError('ECONNREFUSED');

    await expect(closeSession(payload)).rejects.toThrow();
  });
  test('rejects when error-path body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(400, 'not-json');

    await expect(closeSession(payload)).rejects.toThrow();
  });
  test('does not parse a body on 204 success', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(204);

    const result = await closeSession(payload);
    expect(result).toBe(true);
  });
  test('throws sdkApiError when the api responds with a 500', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v4/session/${protocol}/${listeningIp}/${port}`)
      .reply(500, { status: 'INTERNAL_SERVER_ERROR' });

    await expect(closeSession(payload)).rejects.toThrow(sdkApiError);
  });
});
