import nock from 'nock';
import { APIError } from '../../utils';
import { closeChannel } from './closeChannel';
import { CloseChannelResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_CHANNEL_ID = '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test redeemTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v3/channels/${BUDDY_CHANNEL_ID}`)
      .reply(200, {
        receipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e',
        channelStatus: 'Closed'
      } as CloseChannelResponseType);

    const response = await closeChannel({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      channelId: BUDDY_CHANNEL_ID,
    });

    expect(response.transactionReceipt).toEqual(
      '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    );
    expect(response.channelStatus).toEqual('Closed');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v3/channels/${BUDDY_CHANNEL_ID}`)
      .reply(400, {
        status: 'INVALID_CHANNELID'
      });

    await expect(
      closeChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID,
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v3/channels/${BUDDY_CHANNEL_ID}`)
      .reply(401, {
        status: 'string',
        error: 'string'
      });

    await expect(
      closeChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID,
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v3/channels/${BUDDY_CHANNEL_ID}`)
      .reply(403, {
        status: 'string',
        error: 'string'
      });

    await expect(
      closeChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID,
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v3/channels/${BUDDY_CHANNEL_ID}`)
      .reply(422, {
        status: 'UNKNOWN_FAILURE',
        error: 'Full error message.'
      });

    await expect(
      closeChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID,
      })
    ).rejects.toThrow(APIError);
  });
});
