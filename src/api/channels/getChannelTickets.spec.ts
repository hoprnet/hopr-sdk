import nock from 'nock';
import { APIError } from '../../utils';
import { getChannelTickets } from './getChannelTickets';
import { GetChannelTicketsResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_CHANNEL_ID =
  '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test redeemTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets`)
      .reply(200, [
        {
          channelId: '0xBb6f3A07a6EF6d4Aa6Aa244949AA59cBE735549f',
          indexOffset: '0',
          index: 6,
          amount: '10000000000000000',
          winProb:
            '115792089237316195423570985008687907853269984665640564039457584007913129639935',
          channelEpoch: 1,
          signature:
            '0xcce78f4488519afacc9674c2d7110a7cca8eae33a1bd0c8d836d40a3670b89f7e323c12f910554bd8d961a5b0b9e70abe70bfff60c22ba50e102e6454065dd46'
        }
      ] as GetChannelTicketsResponseType);

    const response = await getChannelTickets({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      channelId: BUDDY_CHANNEL_ID
    });

    expect(response.length).toEqual(1);
    expect(response.at(0)?.channelId).toEqual(
      '0xBb6f3A07a6EF6d4Aa6Aa244949AA59cBE735549f'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets`)
      .reply(400, {
        status: 'INVALID_CHANNELID'
      });

    await expect(
      getChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets`)
      .reply(401, {
        status: 'string',
        error: 'string'
      });

    await expect(
      getChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets`)
      .reply(403, {
        status: 'string',
        error: 'string'
      });

    await expect(
      getChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 404 error', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets`)
      .reply(404, {
        status: 'TICKETS_NOT_FOUND'
      });

    await expect(
      getChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/channels/${BUDDY_CHANNEL_ID}/tickets`)
      .reply(422, {
        status: 'UNKNOWN_FAILURE',
        error: 'Full error message.'
      });

    await expect(
      getChannelTickets({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
});
