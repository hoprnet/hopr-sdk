import nock from 'nock';
import { getOutgoingChannels } from './getOutgoingChannels';
import { GetChannelsResponseType } from '../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('getOutgoingChannels', function () {
  afterEach(() => {
    nock.cleanAll();
  });

  const channelsResponse: GetChannelsResponseType = {
    incoming: [],
    outgoing: [
      {
        id: '0x1111111111111111111111111111111111111111111111111111111111111111',
        peerAddress: '0xpeerOpen',
        status: 'Open',
        balance: '500000000000000000'
      },
      {
        id: '0x2222222222222222222222222222222222222222222222222222222222222222',
        peerAddress: '0xpeerClosed',
        status: 'Closed',
        balance: '0'
      }
    ],
    all: []
  };

  it('filters outgoing channels by status when status is provided', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(200, channelsResponse);

    const result = await getOutgoingChannels({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      status: 'Open'
    });

    expect(result?.length).toBe(1);
    expect(result?.[0]?.peerAddress).toBe('0xpeerOpen');
  });

  it('returns all outgoing channels when status is undefined', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(200, channelsResponse);

    const result = await getOutgoingChannels({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });

    expect(result?.length).toBe(2);
  });
});
