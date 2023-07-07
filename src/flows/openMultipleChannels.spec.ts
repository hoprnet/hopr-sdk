import nock from 'nock';
import { closeEverything, openMultipleChannels } from './index';
import * as channels from '../api/channels';

jest.mock('../api/channels', () => ({
  ...jest.requireActual('../api/channels'),
  openChannel: jest.fn()
}));

// Set up global constants for URL and API key
const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('openMultipleChannels', function () {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should not attempt to open channels if node does not have enough balance', async function () {
    // mock hoprd node get balances
    nock(API_ENDPOINT).get('/api/v2/account/balances').reply(200, {
      native: '10',
      hopr: '0'
    });

    const res = await openMultipleChannels({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      peerIds: ['id1', 'id2'],
      amount: '6'
    });

    expect((channels.openChannel as jest.Mock).mock.calls.length).toEqual(0);
    expect(res).toEqual(undefined);
  });
  it('should open channels', async function () {
    const peerIds = ['id1', 'id2'];
    // mock hoprd node get balances
    nock(API_ENDPOINT)
      .get('/api/v2/account/balances')
      .reply(200, {
        native: BigInt(0.03 * 10e18).toString(),
        hopr: '10'
      });

    // mock hoprd node open channel
    (channels.openChannel as jest.Mock).mockImplementation(() => ({
      channelId:
        '0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5',
      receipt:
        '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    }));

    const res = await openMultipleChannels({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      peerIds,
      amount: '3'
    });

    expect((channels.openChannel as jest.Mock).mock.calls.length).toEqual(
      peerIds.length
    );
    expect(res?.[peerIds.at(0) ?? '']).toEqual({
      channelId:
        '0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5',
      receipt:
        '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    });
  });
});