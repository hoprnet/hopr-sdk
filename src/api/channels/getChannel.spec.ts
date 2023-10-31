import nock from 'nock';
import { APIError } from '../../utils';
import { getChannel } from './getChannel';
import { GetChannelResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BUDDY_CHANNEL_ID =
  '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12';

describe('test getChannel', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/channels/${BUDDY_CHANNEL_ID}`)
      .reply(200, {
        channelId:
          '0x624d7f7a76d60b6e4546ec9429f2266620aa010d47bf05998c3f73e2256b1f7e',
        sourcePeerId: '12Diu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQ',
        destinationPeerId: '12Diu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQ',
        sourceAddress: '1.339446426793328e+48',
        destinationAddress: '1.339446426793328e+48',
        balance: '10000000000000000000',
        status: 'Open',
        ticketIndex: 'string',
        channelEpoch: 'string',
        closureTime: 'string'
      } as GetChannelResponseType);

    const response = await getChannel({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      channelId: BUDDY_CHANNEL_ID
    });

    expect(response.channelId).toEqual(
      '0x624d7f7a76d60b6e4546ec9429f2266620aa010d47bf05998c3f73e2256b1f7e'
    );
    expect(response.status).toEqual('Open');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/channels/${BUDDY_CHANNEL_ID}`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/channels/${BUDDY_CHANNEL_ID}`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/channels/${BUDDY_CHANNEL_ID}`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/channels/${BUDDY_CHANNEL_ID}`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getChannel({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        channelId: BUDDY_CHANNEL_ID
      })
    ).rejects.toThrow(APIError);
  });
});
