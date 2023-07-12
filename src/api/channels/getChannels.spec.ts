import nock from 'nock';
import { APIError } from '../../utils';
import { getChannels } from './getChannels';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getChannels', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get('/api/v3/channels')
      .reply(200, {
        incoming: [
          {
            type: 'outgoing',
            channelId:
              '0x00e846e435ec570cda9dcfd0c8fa8fbade524228f9521de954ee919fee3322b8',
            peerId: '16Uiu2HAmEMVsLfMNFHmWZdHzLWYEQz4movezDH1qbs5BxFSYyisX',
            status: 'Open',
            balance: '500000000000000000'
          }
        ],
        outgoing: [
          {
            type: 'incoming',
            channelId:
              '0xecc80ea0f680833f04b05adfeaed745be42bd130570adca3ad65f11a1650fac8',
            peerId: '16Uiu2HAmMKtUteDFiC8k7FZPeTVvwteM1WNtNCQ91X5875CMQEHS',
            status: 'Open',
            balance: '500000000000000000'
          }
        ],
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

    const response = await getChannels({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
    });

    expect(response.incoming.at(0)?.peerId).toEqual(
      '16Uiu2HAmEMVsLfMNFHmWZdHzLWYEQz4movezDH1qbs5BxFSYyisX'
    );
    expect(response.outgoing.at(0)?.balance).toEqual('500000000000000000');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get('/api/v3/channels').reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get('/api/v3/channels').reply(403, {
      status: 'NOT_ENOUGH_BALANCE'
    });

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get('/api/v3/channels').reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
});
