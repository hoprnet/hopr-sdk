import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { fundChannel } from './fundChannel';
import { sdkApiError } from '../../utils';
import { FundChannelsResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const ADDRESS = '0x3262f13a39efaca789ae58390441c9ed76bc658a';
const HASH =
  '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e';

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

describe('test fundChannel', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/channels/${ADDRESS}/fund`)
      .reply(200, { hash: HASH } as FundChannelsResponseType);

    const response = await fundChannel({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      address: ADDRESS,
      amount: '1000000'
    });

    expect(response.hash).toEqual(HASH);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/channels/${ADDRESS}/fund`).reply(400, {
      status: 'INVALID_ADDRESS'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/channels/${ADDRESS}/fund`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/channels/${ADDRESS}/fund`).reply(403, {
      status: 'NOT_ENOUGH_BALANCE'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 404 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/channels/${ADDRESS}/fund`).reply(404, {
      status: 'CHANNEL_NOT_FOUND',
      error: 'Channel not found.'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 412 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/channels/${ADDRESS}/fund`).reply(412, {
      status: 'the node is not ready'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post(`/api/v4/channels/${ADDRESS}/fund`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });
    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/channels/${ADDRESS}/fund`)
      .reply(200, { unexpected: 'shape' });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        fundChannel({
          apiToken: API_TOKEN,
          apiEndpoint: url,
          address: ADDRESS,
          amount: '1000000',
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/channels/${ADDRESS}/fund`)
      .replyWithError('ECONNREFUSED');

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/channels/${ADDRESS}/fund`)
      .reply(200, 'not-json');

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow();
  });
});
