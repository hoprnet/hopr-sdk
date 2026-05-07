import nock from 'nock';
import http from 'http';
import { sdkApiError } from '../../utils';
import { redeemAllTickets } from './redeemAllTickets';
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

describe('test redeemAllTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response (202)', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(202);

    const response = await redeemAllTickets({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 404 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(404, {
      status: 'TICKETS_NOT_FOUND',
      error: 'No tickets to redeem.'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(400, {
      status: 'INVALID_ERROR'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws the node is not ready when hoprd api response is an 412 error ', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(412, {
      status: 'the node is not ready',
      error: 'the node is not ready'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a ZodError when response cannot be parsed as ApiErrorResponse', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(400, {
      unexpectedFormat: 'This is not the expected error format'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('does not parse a body on 202 success', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(202);

    const result = await redeemAllTickets({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });
    expect(result).toBe(true);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        redeemAllTickets({
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
      .post(`/api/v4/tickets/redeem`)
      .replyWithError('ECONNREFUSED');

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
  it('rejects when error-path body is malformed JSON', async function () {
    nock(API_ENDPOINT).post(`/api/v4/tickets/redeem`).reply(400, 'not-json');

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
  it('throws sdkApiError when the api responds with a 500', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/tickets/redeem`)
      .reply(500, { status: 'INTERNAL_SERVER_ERROR' });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('forwards the address from the payload into the request body', async function () {
    let capturedBody: any = null;
    nock(API_ENDPOINT)
      .post(`/api/v4/tickets/redeem`, (body) => {
        capturedBody = body;
        return true;
      })
      .reply(202);

    const ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
    const result = await redeemAllTickets({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      address: ADDRESS
    });
    expect(result).toBe(true);
    expect(capturedBody).toEqual({ address: ADDRESS });
  });
});
