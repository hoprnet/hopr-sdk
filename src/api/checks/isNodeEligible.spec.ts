import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { isNodeEligible } from './isNodeEligible';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

const startHangingServer = async () => {
  nock.enableNetConnect('127.0.0.1');
  const server = http.createServer(() => {});
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve())
  );
  const port = (server.address() as import('net').AddressInfo).port;
  const stop = async () => {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
    nock.disableNetConnect();
  };
  return { url: `http://127.0.0.1:${port}`, stop };
};

describe('test isNodeEligible', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response (node eligible)', async function () {
    nock(API_ENDPOINT).get(`/eligiblez`).reply(200);

    const response = await isNodeEligible({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(true);
  });
  it('handles successful response (node not eligible)', async function () {
    nock(API_ENDPOINT).get(`/eligiblez`).reply(412);

    const response = await isNodeEligible({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(false);
  });
  it('throws an Error when the api responds with a 500', async function () {
    nock(API_ENDPOINT).get(`/eligiblez`).reply(500, 'Internal Server Error');

    await expect(
      isNodeEligible({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(Error);
  });
  it('throws ZodError when error-path body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get(`/eligiblez`)
      .reply(400, { unexpected: 'shape' });

    let caught: any;
    try {
      await isNodeEligible({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT });
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeDefined();
    expect(caught?.name).toBe('ZodError');
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        isNodeEligible({
          apiToken: API_TOKEN,
          apiEndpoint: url,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get(`/eligiblez`)
      .replyWithError('ECONNREFUSED');

    await expect(
      isNodeEligible({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
  it('rejects when error-path body is malformed JSON', async function () {
    nock(API_ENDPOINT).get(`/eligiblez`).reply(400, 'not-json');

    await expect(
      isNodeEligible({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
  it('throws sdkApiError when error-path body matches ApiErrorResponse', async function () {
    nock(API_ENDPOINT).get(`/eligiblez`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });

    await expect(
      isNodeEligible({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
