import nock from 'nock';
import { APIError } from '../../utils';
import { redeemChannelTickets } from './redeemChannelTickets';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_CHANNEL_ID =
  '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test redeemChannelTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets/redeem`)
      .reply(204);

    const response = await redeemChannelTickets({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      channelId: BUDDY_CHANNEL_ID
    });

    expect(response).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets/redeem`)
      .reply(400, {
        status: 400,
        statusText: 'INVALID_CHANNELID'
      });

    await expect(
      redeemChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets/redeem`)
      .reply(401, {
        status: 401,
        statusText: 'string',
        error: 'string'
      });

    await expect(
      redeemChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets/redeem`)
      .reply(403, {
        status: 403,
        statusText: 'string',
        error: 'string'
      });

    await expect(
      redeemChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 404 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets/redeem`)
      .reply(404, {
        status: 404,
        statusText: 'TICKETS_NOT_FOUND'
      });

    await expect(
      redeemChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets/redeem`)
      .reply(422, {
        status: 422,
        statusText: 'UNKNOWN_FAILURE',
        error: 'Full error message.'
      });

    await expect(
      redeemChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
});
