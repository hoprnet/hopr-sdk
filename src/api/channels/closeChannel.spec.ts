import nock from 'nock';
import { APIError } from '../../utils';
import { closeChannel } from './closeChannel';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_PEER_ID = '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';
const DIRECTION = 'outgoing';

describe('test redeemTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH)
      .delete(`/api/v2/channels/${BUDDY_PEER_ID}/${DIRECTION}`)
      .reply(200, {
        receipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e',
        channelStatus: 'Closed'
      });

    const response = await closeChannel(BASE_PATH, API_TOKEN, {
      peerId: BUDDY_PEER_ID,
      direction: 'outgoing'
    });

    expect(response.receipt).toEqual(
      '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    );
    expect(response.channelStatus).toEqual('Closed');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH)
      .delete(`/api/v2/channels/${BUDDY_PEER_ID}/${DIRECTION}`)
      .reply(400, {
        status: 'INVALID_PEERID'
      });

    await expect(
      closeChannel(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID,
        direction: 'outgoing'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(BASE_PATH)
      .delete(`/api/v2/channels/${BUDDY_PEER_ID}/${DIRECTION}`)
      .reply(401, {
        status: 'string',
        error: 'string'
      });

    await expect(
      closeChannel(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID,
        direction: 'outgoing'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH)
      .delete(`/api/v2/channels/${BUDDY_PEER_ID}/${DIRECTION}`)
      .reply(403, {
        status: 'string',
        error: 'string'
      });

    await expect(
      closeChannel(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID,
        direction: 'outgoing'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH)
      .delete(`/api/v2/channels/${BUDDY_PEER_ID}/${DIRECTION}`)
      .reply(422, {
        status: 'UNKNOWN_FAILURE',
        error: 'Full error message.'
      });

    await expect(
      closeChannel(BASE_PATH, API_TOKEN, {
        peerId: BUDDY_PEER_ID,
        direction: 'outgoing'
      })
    ).rejects.toThrow(APIError);
  });
});
