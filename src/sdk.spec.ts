import nock from 'nock';
import { HoprSdk } from './sdk';
// Set up global constants for URL and API key
const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('test HoprdSdk class', function () {
  let sdk: HoprSdk;
  beforeEach(function () {
    sdk = new HoprSdk({
      apiToken: API_KEY,
      url: API_URL
    });
  });

  describe('safeSendMessage', function () {
    it('should not send if node has no outgoing channel', async function () {
      const sendMessageSpy = jest.spyOn(sdk.api.messages, 'sendMessage');
      // mock hoprd node channels
      nock(API_URL)
        .get('/api/v2/channels')
        .reply(200, {
          incoming: [],
          outgoing: [
            {
              type: 'incoming',
              channelId:
                '0xecc80ea0f680833f04b05adfeaed745be42bd130570adca3ad65f11a1650fac8',
              peerId: '16Uiu2HAmMKtUteDFiC8k7FZPeTVvwteM1WNtNCQ91X5875CMQEHS',
              status: 'Closed',
              balance: '500000000000000000'
            }
          ]
        });
      await sdk.safeSendMessage({
        body: 'body',
        recipient: '16Uiu2HAmEMVsLfMNFHmWZdHzLWYEQz4movezDH1qbs5BxFSYyisX',
        path: []
      });
      expect(sendMessageSpy.mock.calls.length).toEqual(0);
    });
    it('should send message', async function () {
      const sendMessageSpy = jest.spyOn(sdk.api.messages, 'sendMessage');
      // mock hoprd node channels
      nock(API_URL)
        .get('/api/v2/channels')
        .reply(200, {
          incoming: [],
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

      // mock hoprd node messages
      nock(API_URL).post('/api/v2/messages').reply(202, 'challenge-token');

      const challenge = await sdk.safeSendMessage({
        body: 'body',
        recipient: '16Uiu2HAmEMVsLfMNFHmWZdHzLWYEQz4movezDH1qbs5BxFSYyisX',
        path: []
      });

      expect(sendMessageSpy.mock.calls.length).toEqual(1);
      expect(challenge).toEqual('challenge-token');
    });
  });

  describe('closeEverything', function () {});

  describe('cashOut', function () {});

  describe('openMultipleChannels', function () {});
});
