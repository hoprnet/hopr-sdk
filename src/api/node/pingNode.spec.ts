import nock from 'nock';
import { APIError } from '../../utils';
import { pingNode } from './pingNode';

const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';
const BUDDY_PEER_ID = '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test pingNode', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_URL).post(`/api/v2/node/ping`).reply(200, {
      latency: 10
    });

    const response = await pingNode({
      apiKey: API_KEY,
      url: API_URL,
      peerId: BUDDY_PEER_ID
    });

    expect(response.latency).toEqual(10);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_URL).post(`/api/v2/node/ping`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      pingNode({
        apiKey: API_KEY,
        url: API_URL,
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_URL).post(`/api/v2/node/ping`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      pingNode({
        apiKey: API_KEY,
        url: API_URL,
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_URL).post(`/api/v2/node/ping`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      pingNode({
        apiKey: API_KEY,
        url: API_URL,
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_URL).post(`/api/v2/node/ping`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      pingNode({
        apiKey: API_KEY,
        url: API_URL,
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
});
