import nock from 'nock';
import { APIError } from '../../utils';
import { getPeers } from './get-peers';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getPeers', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH)
      .get(`/api/v2/node/peers`)
      .reply(200, {
        connected: [
          {
            peerId: '16Uiu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQxTWDcmUX5847roBar',
            multiAddr:
              '/p2p/16Uiu2HAmVLfzSLQoLtCGSfQv5ac2GTQmMuxXFkZZgrmuirfT8gaJ',
            heartbeats: {
              sent: 10,
              success: 8
            },
            lastSeen: 1646410980793,
            quality: 0.8,
            backoff: 0,
            isNew: true
          }
        ],
        announced: [
          {
            peerId: '16Uiu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQxTWDcmUX5847roBar',
            multiAddr:
              '/p2p/16Uiu2HAmVLfzSLQoLtCGSfQv5ac2GTQmMuxXFkZZgrmuirfT8gaJ',
            heartbeats: {
              sent: 10,
              success: 8
            },
            lastSeen: 1646410980793,
            quality: 0.8,
            backoff: 0,
            isNew: true
          }
        ]
      });

    const response = await getPeers(BASE_PATH, API_TOKEN);

    expect(response.announced.at(0)?.peerId).toEqual(
      '16Uiu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQxTWDcmUX5847roBar'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/peers`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(getPeers(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/peers`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(getPeers(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/peers`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(getPeers(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/peers`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(getPeers(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
});
