import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { getSessions } from './getSessions';
import { sdkApiError } from '../../utils';
import { GetSessionsResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const PROTOCOL = 'udp';

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

describe('getSessions', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return a list of sessions with their corresponding data if 200', async function () {
    const expectedResponse: GetSessionsResponseType = [
      {
        activeClients: ['0xabc'],
        destination: '0x123',
        forwardPath: {
          Hops: 1
        },
        hoprMtu: 1500,
        ip: '127.0.0.1',
        maxClientSessions: 2,
        maxSurbUpstream: '2000 kb/s',
        port: 5542,
        protocol: PROTOCOL,
        returnPath: {
          Hops: 1
        },
        sessionPool: 5,
        surbLen: 398,
        target: 'example.com:80'
      },
      {
        activeClients: [],
        destination: '0x1234',
        forwardPath: {
          Hops: 1
        },
        hoprMtu: 1500,
        ip: '127.0.0.1',
        maxClientSessions: 5,
        port: 5543,
        protocol: PROTOCOL,
        returnPath: {
          Hops: 1
        },
        surbLen: 398,
        target: 'example.com:80'
      }
    ];

    nock(API_ENDPOINT)
      .get(`/api/v4/session/${PROTOCOL}`)
      .reply(200, expectedResponse);

    const result = await getSessions({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      protocol: PROTOCOL
    });

    expect(result).toEqual(expectedResponse);
  });

  it('should throw a sdkApiError when the api responds with a 400', async function () {
    nock(API_ENDPOINT).get(`/api/v4/session/${PROTOCOL}`).reply(400, {
      status: 'INVALID_INPUT',
      error: 'Invalid protocol.'
    });

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should throw a sdkApiError when the api responds with a 401', async function () {
    nock(API_ENDPOINT).get(`/api/v4/session/${PROTOCOL}`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should return an 422 when there is an unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_ENDPOINT)
      .get(`/api/v4/session/${PROTOCOL}`)
      .reply(422, expectedResponse);

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should return a status 500', async function () {
    nock(API_ENDPOINT).get(`/api/v4/session/${PROTOCOL}`).reply(500);

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body fails the response schema', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/${PROTOCOL}`)
      .reply(200, [{ activeClients: 'not-an-array' }]);

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow(ZodError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/${PROTOCOL}`)
      .reply(200, { unexpected: 'shape' });

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getSessions({
          apiEndpoint: url,
          apiToken: API_TOKEN,
          protocol: PROTOCOL,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/${PROTOCOL}`)
      .replyWithError('ECONNREFUSED');

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/session/${PROTOCOL}`)
      .reply(200, 'not-json');

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow();
  });
});
