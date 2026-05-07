import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { getConnected } from './getConnected';
import { GetConnectedResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

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

describe('test getConnected', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    const expectedResponse: GetConnectedResponseType = [
      {
        address: '0x3262f13a39efaca789ae58390441c9ed76bc658a',
        probeRate: 1,
        lastUpdate: 1700000000,
        score: 0.9,
        averageLatency: 50
      }
    ];

    nock(API_ENDPOINT)
      .get(`/api/v4/network/connected`)
      .reply(200, expectedResponse);

    const response = await getConnected({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(expectedResponse);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/network/connected`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });

    await expect(
      getConnected({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/network/connected`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getConnected({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body fails the response schema', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/connected`)
      .reply(200, [{ address: 12345 }]);

    await expect(
      getConnected({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/connected`)
      .reply(200, { unexpected: 'shape' });

    await expect(
      getConnected({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getConnected({ apiToken: API_TOKEN, apiEndpoint: url, timeout: 100 })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/connected`)
      .replyWithError('ECONNREFUSED');

    await expect(
      getConnected({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/connected`)
      .reply(200, 'not-json');

    await expect(
      getConnected({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
});
