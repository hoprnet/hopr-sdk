import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { getChannel } from './getChannel';
import { GetChannelResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const ADDRESS = '0x3262f13a39efaca789ae58390441c9ed76bc658a';

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

describe('test getChannel', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/channels/${ADDRESS}`)
      .reply(200, {
        channelId:
          '0x624d7f7a76d60b6e4546ec9429f2266620aa010d47bf05998c3f73e2256b1f7e',
        source: '0xaB51F95ED1Fa8d4afE40A3a1B8f44A242307390c',
        destination: '0xbFdbE0e896C989b23D6cA83E12AD4df1739B6E28',
        balance: '10000000000000000000',
        status: 'Open',
        ticketIndex: 0,
        channelEpoch: 1,
        closureTime: 0
      } as GetChannelResponseType);

    const response = await getChannel({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      address: ADDRESS
    });

    expect(response.channelId).toEqual(
      '0x624d7f7a76d60b6e4546ec9429f2266620aa010d47bf05998c3f73e2256b1f7e'
    );
    expect(response.status).toEqual('Open');
  });
  it('handles successful response when direction is set', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/channels/${ADDRESS}?direction=outgoing`)
      .reply(200, {
        channelId:
          '0x624d7f7a76d60b6e4546ec9429f2266620aa010d47bf05998c3f73e2256b1f7e',
        source: '0xaB51F95ED1Fa8d4afE40A3a1B8f44A242307390c',
        destination: '0xbFdbE0e896C989b23D6cA83E12AD4df1739B6E28',
        balance: '10000000000000000000',
        status: 'Open',
        ticketIndex: 0,
        channelEpoch: 1,
        closureTime: 0
      } as GetChannelResponseType);

    const response = await getChannel({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      address: ADDRESS,
      direction: 'outgoing'
    });

    expect(response.channelId).toEqual(
      '0x624d7f7a76d60b6e4546ec9429f2266620aa010d47bf05998c3f73e2256b1f7e'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/${ADDRESS}`).reply(400, {
      status: 'INVALID_ADDRESS'
    });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/${ADDRESS}`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 404 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/${ADDRESS}`).reply(404, {
      status: 'CHANNEL_NOT_FOUND',
      error: 'Channel not found.'
    });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/${ADDRESS}`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/channels/${ADDRESS}`)
      .reply(200, { unexpected: 'shape' });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS
      })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getChannel({
          apiToken: API_TOKEN,
          apiEndpoint: url,
          address: ADDRESS,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/channels/${ADDRESS}`)
      .replyWithError('ECONNREFUSED');

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS
      })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/channels/${ADDRESS}`)
      .reply(200, 'not-json');

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS
      })
    ).rejects.toThrow();
  });
  it('throws sdkApiError when the api responds with a 500', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/channels/${ADDRESS}`)
      .reply(500, { status: 'INTERNAL_SERVER_ERROR' });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
});
