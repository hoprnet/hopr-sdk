import nock from 'nock';
import { APIError } from '../../utils';
import { redeemTickets } from './redeemTickets';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_PEER_ID = '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test redeemTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH)
      .post(`/api/v2/channels/${BUDDY_PEER_ID}/tickets/redeem`)
      .reply(204);

    const response = await redeemTickets(BASE_PATH, API_TOKEN, {
      peerId: BUDDY_PEER_ID
    });

    expect(response).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH)
      .post(`/api/v2/channels/${BUDDY_PEER_ID}/tickets/redeem`)
      .reply(400, {
        status: 'INVALID_PEERID'
      });

    await expect(
      redeemTickets(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(BASE_PATH)
      .post(`/api/v2/channels/${BUDDY_PEER_ID}/tickets/redeem`)
      .reply(401, {
        status: 'string',
        error: 'string'
      });

    await expect(
      redeemTickets(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH)
      .post(`/api/v2/channels/${BUDDY_PEER_ID}/tickets/redeem`)
      .reply(403, {
        status: 'string',
        error: 'string'
      });

    await expect(
      redeemTickets(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 404 error', async function () {
    nock(BASE_PATH)
      .post(`/api/v2/channels/${BUDDY_PEER_ID}/tickets/redeem`)
      .reply(404, {
        status: 'TICKETS_NOT_FOUND'
      });

    await expect(
      redeemTickets(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH)
      .post(`/api/v2/channels/${BUDDY_PEER_ID}/tickets/redeem`)
      .reply(422, {
        status: 'UNKNOWN_FAILURE',
        error: 'Full error message.'
      });

    await expect(
      redeemTickets(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID
      })
    ).rejects.toThrow(APIError);
  });
});
