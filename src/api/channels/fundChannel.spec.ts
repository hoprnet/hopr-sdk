import nock from 'nock';
import { APIError } from '../../utils';
import { fundChannel } from './fundChannel';
import { FundChannelResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const CHANNEL_ID =
  '0xddf4f494de8893954ab0eb7878d0488b787ff7931a54b8b79666ce212dc08c13';
const AMOUNT_TO_FUND = '1000000000000000000';

describe('test fundChannel', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/channels/${CHANNEL_ID}/fund`)
      .reply(200, {
        receipt: 'TRANSACTION_RECEIPT'
      } as FundChannelResponseType);

    const response = await fundChannel({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      channelId: CHANNEL_ID,
      amount: AMOUNT_TO_FUND,
      timeout: 5000
    });

    // Add your assertions here to match the expected response
    expect(response.receipt).toEqual('TRANSACTION_RECEIPT');
  });

  it('throws a custom error when API response is a 400 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/channels/${CHANNEL_ID}/fund`).reply(400, {
      status: 'INVALID_CHANNELID'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: CHANNEL_ID,
        amount: AMOUNT_TO_FUND,
        timeout: 5000
      })
    ).rejects.toThrow(APIError);
  });

  it('throws a custom error when API response is a 401 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/channels/${CHANNEL_ID}/fund`).reply(401, {
      status: 'AUTHENTICATION_FAILED',
      error: 'Authentication failed'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: CHANNEL_ID,
        amount: AMOUNT_TO_FUND,
        timeout: 5000
      })
    ).rejects.toThrow(APIError);
  });

  it('throws a custom error when API response is a 403 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/channels/${CHANNEL_ID}/fund`).reply(403, {
      status: 'AUTHORIZATION_FAILED',
      error: 'Authorization failed'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: CHANNEL_ID,
        amount: AMOUNT_TO_FUND,
        timeout: 5000
      })
    ).rejects.toThrow(APIError);
  });

  it('throws a custom error when API response is a 422 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/channels/${CHANNEL_ID}/fund`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      fundChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: CHANNEL_ID,
        amount: AMOUNT_TO_FUND,
        timeout: 5000
      })
    ).rejects.toThrow(APIError);
  });
});
