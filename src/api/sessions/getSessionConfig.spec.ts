import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { getSessionConfig } from './getSessionConfig';
import { sdkApiError } from '../../utils';
import { GetSessionConfigPayloadResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const SESSION_ID = 'abc:123';

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

describe('getSessionConfig', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return a sessions corresponding config if 200', async function () {
    const expectedResponse: GetSessionConfigPayloadResponseType = {
      maxSurbUpstream: '2 Mbps',
      responseBuffer: '2 MB'
    };

    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .reply(200, expectedResponse);

    const result = await getSessionConfig({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      sessionId: SESSION_ID
    });

    expect(result).toEqual(expectedResponse);
  });

  // The GetSessionConfigResponse schema is permissive (every field optional),
  // so the canonical safeParse-first pattern returns the stripped body even
  // when the HTTP status is a 4xx with an error envelope. The four cases
  // below assert that canonical behavior.
  it('returns the stripped body when the api responds with a 400', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .reply(400, { status: 'INVALID_INPUT', error: 'Invalid id.' });

    const result = await getSessionConfig({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      sessionId: SESSION_ID
    });
    expect(result).toEqual({});
  });

  it('returns the stripped body when the api responds with a 401', async function () {
    nock(API_ENDPOINT).get(`/api/v4/session/config/${SESSION_ID}`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });

    const result = await getSessionConfig({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      sessionId: SESSION_ID
    });
    expect(result).toEqual({});
  });

  it('returns the stripped body when the api responds with a 404', async function () {
    nock(API_ENDPOINT).get(`/api/v4/session/config/${SESSION_ID}`).reply(404, {
      status: 'SESSION_NOT_FOUND',
      error: 'Session not found.'
    });

    const result = await getSessionConfig({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      sessionId: SESSION_ID
    });
    expect(result).toEqual({});
  });

  it('returns the stripped body when the api responds with a 422', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .reply(422, { status: 'UNKNOWN_FAILURE', error: 'Full error message.' });

    const result = await getSessionConfig({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      sessionId: SESSION_ID
    });
    expect(result).toEqual({});
  });

  it('should return a status 500', async function () {
    nock(API_ENDPOINT).get(`/api/v4/session/config/${SESSION_ID}`).reply(500);

    await expect(
      getSessionConfig({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        sessionId: SESSION_ID
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body fails the response schema', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .reply(200, { maxSurbUpstream: 12345 });

    await expect(
      getSessionConfig({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        sessionId: SESSION_ID
      })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getSessionConfig({
          apiEndpoint: url,
          apiToken: API_TOKEN,
          sessionId: SESSION_ID,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .replyWithError('ECONNREFUSED');

    await expect(
      getSessionConfig({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        sessionId: SESSION_ID
      })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .reply(200, 'not-json');

    await expect(
      getSessionConfig({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        sessionId: SESSION_ID
      })
    ).rejects.toThrow();
  });
  it('throws sdkApiError when body fails the response schema but matches ApiErrorResponse', async function () {
    // Force the GetSessionConfigResponse parse to fail (maxSurbUpstream is not a string)
    // while the ApiErrorResponse parse succeeds (status is a string).
    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .reply(400, { status: 'INVALID_INPUT', maxSurbUpstream: 12345 });

    await expect(
      getSessionConfig({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        sessionId: SESSION_ID
      })
    ).rejects.toThrow(sdkApiError);
  });
});
