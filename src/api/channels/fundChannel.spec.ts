import nock from 'nock';
import { fundChannel } from './fundChannel';
import { sdkApiError } from '../../utils';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_CHANNEL_ID =
  '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test fundChannels', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/fund`)
      .reply(201, {
        receipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
      });

    const response = await fundChannel({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      channelId: BUDDY_CHANNEL_ID,
      amount: '1000000'
    });

    expect(response.receipt).toEqual(
      '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/fund`)
      .reply(400, {
        status: 'INVALID_PEERID'
      });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/fund`)
      .reply(403, {
        status: 'NOT_ENOUGH_BALANCE'
      });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/fund`)
      .reply(422, {
        status: 'UNKNOWN_FAILURE',
        error: 'Full error message.'
      });
    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error without body', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${BUDDY_CHANNEL_ID}/fund`)
      .reply(422);
    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID,
        amount: '1000000'
      })
    ).rejects.toThrow(sdkApiError);
  });
});
