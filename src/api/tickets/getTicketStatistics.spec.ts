import nock from 'nock';
import http from 'http';
import { sdkApiError } from '../../utils';
import { getTicketStatistics } from './getTicketStatistics';
import { ZodError } from 'zod';

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

describe('test getTicketStatistics', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT).get(`/api/v4/tickets/statistics`).reply(200, {
      neglectedValue: 'string',
      redeemedValue: 'string',
      rejectedValue: 'string',
      unredeemedValue: 'string',
      winningCount: 0
    });

    const response = await getTicketStatistics({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.winningCount).toEqual(0);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/tickets/statistics`).reply(400, {
      status: 'INVALID_ERROR'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/tickets/statistics`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/tickets/statistics`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/tickets/statistics`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a ZodError when response cannot be parsed as ApiErrorResponse', async function () {
    nock(API_ENDPOINT).get(`/api/v4/tickets/statistics`).reply(400, {
      unexpectedFormat: 'This is not the expected error format'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('throws ZodError when 200 body fails the response schema', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/tickets/statistics`)
      .reply(200, { winningCount: 'not-a-number' });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/tickets/statistics`)
      .reply(200, { unexpected: 'shape' });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getTicketStatistics({
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
      .get(`/api/v4/tickets/statistics`)
      .replyWithError('ECONNREFUSED');

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT).get(`/api/v4/tickets/statistics`).reply(200, 'not-json');

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
});
