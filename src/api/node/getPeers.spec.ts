import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getPeers } from './getPeers';
import { GetPeersResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getPeers', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    const expectedResponse: GetPeersResponseType = {
      connected: [
        {
          address: '0x0987654321098765432109876543210987654321',
          multiaddr:
            '/p2p/16Uiu2HAmVLfzSLQoLtCGSfQv5ac2GTQmMuxXFkZZgrmuirfT8gaJ',
          averageLatency: 100,
          lastUpdate: 1646410980793,
          probeRate: 0.476,
          score: 0.7
        }
      ],
      announced: [
        {
          address: '0x0987654321098765432109876543210987654321',
          multiaddrs: ['/ip4/1.1.1.1/tcp/9091']
        }
      ]
    };

    nock(API_ENDPOINT).get(`/api/v4/node/peers`).reply(200, expectedResponse);

    const response = await getPeers({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.announced.at(0)?.address).toEqual(
      '0x0987654321098765432109876543210987654321'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/peers`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getPeers({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/peers`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getPeers({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/peers`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getPeers({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/peers`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getPeers({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
