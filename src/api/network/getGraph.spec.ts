import nock from 'nock';
import http from 'http';
import { sdkApiError } from '../../utils';
import { getGraph } from './getGraph';

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

describe('test getGraph', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    const expectedResponse = 'digraph G {}';

    nock(API_ENDPOINT)
      .get(`/api/v4/network/graph`)
      .reply(200, expectedResponse);

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(expectedResponse);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/network/graph`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });

    await expect(
      getGraph({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getGraph({ apiToken: API_TOKEN, apiEndpoint: url, timeout: 100 })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/graph`)
      .replyWithError('ECONNREFUSED');

    await expect(
      getGraph({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
});
