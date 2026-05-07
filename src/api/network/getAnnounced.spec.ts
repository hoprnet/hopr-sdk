import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { getAnnounced } from './getAnnounced';
import { GetAnnouncedResponseType } from '../../types';

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

describe('test getAnnounced', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    const expectedResponse: GetAnnouncedResponseType = [
      {
        address: '0x3262f13a39efaca789ae58390441c9ed76bc658a',
        multiaddrs: ['/ip4/10.0.2.100/tcp/19092'],
        origin: 'chain'
      }
    ];

    nock(API_ENDPOINT)
      .get(`/api/v4/network/announced`)
      .reply(200, expectedResponse);

    const response = await getAnnounced({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(expectedResponse);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/network/announced`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });

    await expect(
      getAnnounced({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/network/announced`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getAnnounced({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body fails the response schema', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/announced`)
      .reply(200, [{ address: 12345 }]);

    await expect(
      getAnnounced({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/announced`)
      .reply(200, { unexpected: 'shape' });

    await expect(
      getAnnounced({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getAnnounced({ apiToken: API_TOKEN, apiEndpoint: url, timeout: 100 })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/announced`)
      .replyWithError('ECONNREFUSED');

    await expect(
      getAnnounced({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/announced`)
      .reply(200, 'not-json');

    await expect(
      getAnnounced({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
});
