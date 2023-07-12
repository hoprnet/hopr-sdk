import nock from 'nock';
import { APIError } from '../../utils';
import { getPeerInfo } from './getPeerInfo';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_PEER_ID = '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test pingNode', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/peerInfo/${BUDDY_PEER_ID}`)
      .reply(200, {
        announced: [
          '/ip4/',
          '/p2p/',
          '/p2p/',
          '/p2p/',
          '/p2p/',
          '/p2p/',
          '/ip4/',
          '/ip4/'
        ],
        observed: ['/ip4/', '/ip4/', '/ip4/', '/p2p/']
      });

    const response = await getPeerInfo({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      peerId: BUDDY_PEER_ID
    });

    expect(response.observed.at(0)).toEqual('/ip4/');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/peerInfo/${BUDDY_PEER_ID}`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getPeerInfo({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/peerInfo/${BUDDY_PEER_ID}`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getPeerInfo({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/peerInfo/${BUDDY_PEER_ID}`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getPeerInfo({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/peerInfo/${BUDDY_PEER_ID}`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getPeerInfo({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
});
