import nock from 'nock';
import { APIError } from '../../utils';
import { getChannelsWithFullTopology } from './getChannelsWithFullTopology';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getChannelsWithFullTopologyWithFullTopology', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  afterEach(function () {
    nock.abortPendingRequests();
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get('/api/v3/channels?fullTopology=true')
      .reply(200, {
        all: [
          {
            channelId:
              '0x00023da9f252f16970ed0987153e5e64fdae0f41799b6a87306e12d17d060301',
            sourcePeerId:
              '16Uiu2HAm8RWC2ZwhMm1AX8FeJmS9FkWn82qigTYGH4vkrX6Z6AV8',
            destinationPeerId:
              '16Uiu2HAmJpsfNg1JBUFGoJx6gp58BPQwymhPGaJidqPKMm5cETW7',
            sourceAddress: '0xbFdbE0e896C989b23D6cA83E12AD4df1739B6E28',
            destinationAddress: '0xaB51F95ED1Fa8d4afE40A3a1B8f44A242307390c',
            balance: '100000000000000000',
            status: 'Open',
            commitment:
              '0x4830ab9b20341162a0970aa1c6a5286cf85d2daa1d8c982f8ec5f2d9010250f4',
            ticketEpoch: '1',
            ticketIndex: '0',
            channelEpoch: '1',
            closureTime: '0'
          }
        ]
      });

    const response = await getChannelsWithFullTopology({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.all.at(0)?.destinationAddress).toEqual(
      '0xaB51F95ED1Fa8d4afE40A3a1B8f44A242307390c'
    );
    expect(response.all.at(0)?.sourceAddress).toEqual(
      '0xbFdbE0e896C989b23D6cA83E12AD4df1739B6E28'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get('/api/v3/channels?fullTopology=true').reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getChannelsWithFullTopology({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get('/api/v3/channels?fullTopology=true').reply(403, {
      status: 'NOT_ENOUGH_BALANCE'
    });

    await expect(
      getChannelsWithFullTopology({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get('/api/v3/channels?fullTopology=true').reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getChannelsWithFullTopology({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });
});
