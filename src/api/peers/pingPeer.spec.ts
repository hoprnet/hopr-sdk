import nock from 'nock';
import { sdkApiError } from '../../utils';
import { pingPeer } from './pingPeer';
import { PingPeerResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_PEER_ID = '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test pingPeer', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  /* Transition period between 2.1 and 2.2 */
  it('handles successful response using peerId', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/peers/${BUDDY_PEER_ID}/ping`)
      .reply(200, {
        latency: 10,
        reportedVersion: '2.2.0'
      } as PingPeerResponseType);

    const response = await pingPeer({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      peerId: BUDDY_PEER_ID
    });

    expect(response.latency).toEqual(10);
  });
  /* ------------------------------------ */
  it('handles successful response using destination', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/peers/${BUDDY_PEER_ID}/ping`)
      .reply(200, {
        latency: 10,
        reportedVersion: '2.2.0'
      } as PingPeerResponseType);

    const response = await pingPeer({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      destination: BUDDY_PEER_ID
    });

    expect(response.latency).toEqual(10);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/peers/${BUDDY_PEER_ID}/ping`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_PEER_ID
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/peers/${BUDDY_PEER_ID}/ping`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_PEER_ID
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/peers/${BUDDY_PEER_ID}/ping`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_PEER_ID
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/peers/${BUDDY_PEER_ID}/ping`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      pingPeer({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        destination: BUDDY_PEER_ID
      })
    ).rejects.toThrow(sdkApiError);
  });
});
