import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getChannelsCorrupted } from './getChannelsCorrupted';
import { GetChannelsCorruptedResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const REZ = [
  {
    balance: '10 wxHOPR',
    channelEpoch: 1,
    channelId:
      '0x04efc1481d3f106b88527b3844ba40042b823218a9cd29d1aa11c2c2ef8f538f',
    closureTime: 0,
    destination: '0x188c4462b75e46f0c7262d7f48d182447b93a93c',
    source: '0x07eaf07d6624f741e04f4092a755a9027aaab7f6',
    status: 'Open',
    ticketIndex: 0
  }
];

describe('test getChannelsCorrupted', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/channels/corrupted`)
      .reply(200, REZ as GetChannelsCorruptedResponseType);

    const response = await getChannelsCorrupted({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(REZ);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/corrupted`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getChannelsCorrupted({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/corrupted`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getChannelsCorrupted({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/corrupted`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getChannelsCorrupted({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/corrupted`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getChannelsCorrupted({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
});
