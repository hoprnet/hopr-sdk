import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { pingPeer } from './pingPeer';
import { PingPeerResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_NODE_ADDRESS = '0x3262f13a39efaca789ae58390441c9ed76bc658a';

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

describe('test pingPeer', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response using destination', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(200, {
        latency: 10
      } as PingPeerResponseType);

    const response = await pingPeer({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      address: BUDDY_NODE_ADDRESS
    });

    expect(response.latency).toEqual(10);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(400, {
        status: 'INVALID_ERROR'
      });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(401, {
        status: 'string',
        error: 'string'
      });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(403, {
        status: 'string',
        error: 'string'
      });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 404 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(404, {
        status: 'PEER_NOT_FOUND',
        error: 'Peer not found.'
      });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 408 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(408, {
        status: 'PING_TIMEOUT',
        error: 'Ping timed out.'
      });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 412 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(412, {
        status: 'the node is not ready'
      });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(422, {
        status: 'UNKNOWN_FAILURE',
        error: 'Full error message.'
      });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body fails the response schema', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(200, { latency: 'not-a-number' });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(ZodError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(200, { unexpected: 'shape' });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        pingPeer({
          apiToken: API_TOKEN,
          apiEndpoint: url,
          address: BUDDY_NODE_ADDRESS,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .replyWithError('ECONNREFUSED');

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/peers/${BUDDY_NODE_ADDRESS}/ping`)
      .reply(200, 'not-json');

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        address: BUDDY_NODE_ADDRESS
      })
    ).rejects.toThrow();
  });
});
