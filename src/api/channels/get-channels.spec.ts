import nock from 'nock';
import { APIError } from '../../utils';
import { getChannels } from './get-channels';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getChannels', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH)
      .get('/api/v2/channels')
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
        ]
      });

    const response = await getChannels(BASE_PATH, API_TOKEN);

    expect(response.incoming.at(0)?.peerId).toEqual(
      '16Uiu2HAmEMVsLfMNFHmWZdHzLWYEQz4movezDH1qbs5BxFSYyisX'
    );
    expect(response.outgoing.at(0)?.balance).toEqual('500000000000000000');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH).get('/api/v2/channels').reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(getChannels(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH).get('/api/v2/channels').reply(403, {
      status: 'NOT_ENOUGH_BALANCE'
    });

    await expect(getChannels(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH).get('/api/v2/channels').reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(getChannels(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
});
