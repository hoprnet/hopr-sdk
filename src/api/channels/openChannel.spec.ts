import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { openChannel } from './openChannel';
import { OpenChannelResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_NODE_ADDRESS = '0x3262f13a39efaca789ae58390441c9ed76bc658a';

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

describe('test openChannel', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .post('/api/v4/channels')
      .reply(201, {
        channelId:
          '0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5',
        transactionReceipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
      } as OpenChannelResponseType);

    const response = await openChannel({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      destination: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
      amount: '1000000'
    });

    expect(response.channelId).toEqual(
      '0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5'
    );
    expect(response.transactionReceipt).toEqual(
      '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post('/api/v4/channels').reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).post('/api/v4/channels').reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post('/api/v4/channels').reply(403, {
      status: 'NOT_ENOUGH_BALANCE'
    });

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 409 error', async function () {
    nock(API_ENDPOINT).post('/api/v4/channels').reply(409, {
      status: 'CHANNEL_ALREADY_OPEN'
    });

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 412 error', async function () {
    nock(API_ENDPOINT).post('/api/v4/channels').reply(412, {
      status: 'the node is not ready'
    });

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post('/api/v4/channels').reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });
    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('rejects when hoprd api response is a 412 error without body', async function () {
    nock(API_ENDPOINT).post('/api/v4/channels').reply(412);

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow();
  });
  it('rejects when hoprd api response is a 422 error without body', async function () {
    nock(API_ENDPOINT).post('/api/v4/channels').reply(422);

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow();
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .post('/api/v4/channels')
      .reply(200, { unexpected: 'shape' });

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        openChannel({
          apiToken: API_TOKEN,
          apiEndpoint: url,
          destination: BUDDY_NODE_ADDRESS,
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
      .post('/api/v4/channels')
      .replyWithError('ECONNREFUSED');

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .post('/api/v4/channels')
      .reply(200, 'not-json');

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow();
  });
  it('throws sdkApiError when the api responds with a 500', async function () {
    nock(API_ENDPOINT)
      .post('/api/v4/channels')
      .reply(500, { status: 'INTERNAL_SERVER_ERROR' });

    await expect(
      openChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_NODE_ADDRESS,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
});
