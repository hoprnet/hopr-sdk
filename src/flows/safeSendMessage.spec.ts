import nock from 'nock';
import {
  cashOut,
  closeEverything,
  openMultipleChannels,
  safeSendMessage
} from './index';
import * as messages from '../api/messages';
import { GetChannelsResponseType } from '../types';

jest.mock('../api/messages', () => ({
  ...jest.requireActual('../api/messages'),
  sendMessage: jest.fn()
}));

// Set up global constants for URL and API key
const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TAG = 7;

describe('safeSendMessage', function () {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should not send if node has no outgoing channel', async function () {
    // mock hoprd node channels
    nock(API_ENDPOINT)
      .get('/api/v3/channels?includingClosed=false&fullTopology=false')
      .reply(200, {
        incoming: [],
        outgoing: [
          {
            type: 'incoming',
            id: '0xecc80ea0f680833f04b05adfeaed745be42bd130570adca3ad65f11a1650fac8',
            peerId: '16Uiu2HAmMKtUteDFiC8k7FZPeTVvwteM1WNtNCQ91X5875CMQEHS',
            status: 'Closed',
            balance: '500000000000000000'
          }
        ],
        all: []
      } as GetChannelsResponseType);

    await safeSendMessage({
      tag: TAG,
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      body: 'body',
      recipient: '16Uiu2HAmEMVsLfMNFHmWZdHzLWYEQz4movezDH1qbs5BxFSYyisX',
      path: []
    });
    expect((messages.sendMessage as jest.Mock).mock.calls.length).toEqual(0);
  });
  it('should send message', async function () {
    nock(API_ENDPOINT)
      .get('/api/v3/channels?includingClosed=false&fullTopology=false')
      .reply(200, {
        incoming: [],
        outgoing: [
          {
            type: 'incoming',
            id: '0xecc80ea0f680833f04b05adfeaed745be42bd130570adca3ad65f11a1650fac8',
            peerId: '16Uiu2HAmMKtUteDFiC8k7FZPeTVvwteM1WNtNCQ91X5875CMQEHS',
            status: 'Open',
            balance: '500000000000000000'
          }
        ],
        all: []
      } as GetChannelsResponseType);

    // mock hoprd node messages
    (messages.sendMessage as jest.Mock).mockImplementation(
      () => 'challenge-token'
    );

    const challenge = await safeSendMessage({
      tag: TAG,
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      body: 'body',
      recipient: '16Uiu2HAmEMVsLfMNFHmWZdHzLWYEQz4movezDH1qbs5BxFSYyisX',
      path: []
    });

    expect((messages.sendMessage as jest.Mock).mock.calls.length).toEqual(1);
    expect(challenge).toEqual('challenge-token');
  });
});
