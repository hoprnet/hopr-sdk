import nock from 'nock';
import { APIError } from '../../utils';
import { getInfo } from './getInfo';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getInfo', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH)
      .get(`/api/v2/node/info`)
      .reply(200, {
        environment: 'anvil-localhost',
        announcedAddress: [
          '/ip4/128.0.215.32/tcp/9080/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit',
          '/p2p/16Uiu2HAmLpqczAGfgmJchVgVk233rmB2T3DSn2gPG6JMa5brEHZ1/p2p-circuit/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit',
          '/ip4/127.0.0.1/tcp/9080/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit',
          '/ip4/192.168.178.56/tcp/9080/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit'
        ],
        listeningAddress: [
          '/ip4/0.0.0.0/tcp/9080/p2p/16Uiu2HAm91QFjPepnwjuZWzK5pb5ZS8z8qxQRfKZJNXjkgGNUAit'
        ],
        network: 'anvil',
        hoprToken: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        hoprChannels: '0x2a54194c8fe0e3CdeAa39c49B95495aA3b44Db63',
        hoprNetworkRegistryAddress:
          '0xBEE1F5d64b562715E749771408d06D57EE0892A7',
        connectivityStatus: 'GREEN',
        isEligible: true,
        channelClosurePeriod: 1
      });

    const response = await getInfo(BASE_PATH, API_TOKEN);

    expect(response.hoprToken).toEqual(
      '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/info`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(getInfo(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/info`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(getInfo(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/info`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(getInfo(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/info`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(getInfo(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
});
