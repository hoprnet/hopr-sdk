import nock from 'nock';
import { HoprSdk } from './sdk';
// Set up global constants for URL and API key
const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('test HoprdSdk class', function () {
  let sdk: HoprSdk;
  beforeEach(function () {
    sdk = new HoprSdk({
      apiKey: API_KEY,
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

  describe('closeEverything', function () {
    it('closes open channels', async function () {
      const closeChannelSpy = jest.spyOn(sdk.api.channels, 'closeChannel');
      const openOutgoingChannels = ['1', '2', '3'];
      // mock hoprd node get channels
      nock(API_URL)
        .get('/api/v2/channels')
        .reply(200, {
          incoming: [],
          outgoing: openOutgoingChannels.map((id) => ({
            type: 'outgoing',
            channelId:
              '0xecc80ea0f680833f04b05adfeaed745be42bd130570adca3ad65f11a1650fac8',
            peerId: id,
            status: 'Open',
            balance: '500000000000000000'
          }))
        });

      // mock hoprd node tickets statistics
      nock(API_URL).get(`/api/v2/tickets/statistics`).reply(200, {
        pending: 0,
        unredeemed: 0,
        unredeemedValue: 'string',
        redeemed: 0,
        redeemedValue: 'string',
        losingTickets: 0,
        winProportion: 0,
        neglected: 0,
        rejected: 0,
        rejectedValue: 'string'
      });

      // mock hoprd node close channels
      openOutgoingChannels.map((id) => {
        nock(API_URL).delete(`/api/v2/channels/${id}/outgoing`).reply(200, {
          receipt:
            '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e',
          channelStatus: 'Closed'
        });
      });

      const res = await sdk.closeEverything();
      expect(res.closedChannels.length).toBeGreaterThan(0);
      expect(res.closedChannels.length).toEqual(openOutgoingChannels.length);
      expect(res.redeemedTickets).toEqual(false);
      expect(closeChannelSpy.mock.calls.length).toEqual(
        openOutgoingChannels.length
      );
    });
    it('does not close channels that are not open', async function () {
      const closeChannelSpy = jest.spyOn(sdk.api.channels, 'closeChannel');
      const openOutgoingChannels = ['1', '2', '3'];
      // mock hoprd node get channels
      nock(API_URL)
        .get('/api/v2/channels')
        .reply(200, {
          incoming: [],
          outgoing: openOutgoingChannels.map((id) => ({
            type: 'outgoing',
            channelId:
              '0xecc80ea0f680833f04b05adfeaed745be42bd130570adca3ad65f11a1650fac8',
            peerId: id,
            status: 'Closed',
            balance: '500000000000000000'
          }))
        });

      // mock hoprd node tickets statistics
      nock(API_URL).get(`/api/v2/tickets/statistics`).reply(200, {
        pending: 0,
        unredeemed: 0,
        unredeemedValue: 'string',
        redeemed: 0,
        redeemedValue: 'string',
        losingTickets: 0,
        winProportion: 0,
        neglected: 0,
        rejected: 0,
        rejectedValue: 'string'
      });

      // mock hoprd node close channels
      openOutgoingChannels.map((id) => {
        nock(API_URL).delete(`/api/v2/channels/${id}/outgoing`).reply(200, {
          receipt:
            '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e',
          channelStatus: 'Closed'
        });
      });

      const res = await sdk.closeEverything();
      expect(res.closedChannels.length).toEqual(0);
      expect(res.redeemedTickets).toEqual(false);
      expect(closeChannelSpy.mock.calls.length).toEqual(0);
    });
    it('redeems pending tickets', async function () {
      const redeemChannelSpy = jest.spyOn(sdk.api.tickets, 'redeemTickets');
      // mock hoprd node get channels
      nock(API_URL).get('/api/v2/channels').reply(200, {
        incoming: [],
        outgoing: []
      });

      // mock hoprd node tickets statistics
      nock(API_URL).get(`/api/v2/tickets/statistics`).reply(200, {
        pending: 1,
        unredeemed: 0,
        unredeemedValue: 'string',
        redeemed: 0,
        redeemedValue: 'string',
        losingTickets: 0,
        winProportion: 0,
        neglected: 0,
        rejected: 0,
        rejectedValue: 'string'
      });

      // mock hoprd redeem tickets
      nock(API_URL).post(`/api/v2/tickets/redeem`).reply(204);

      const res = await sdk.closeEverything();
      expect(res.closedChannels.length).toEqual(0);
      expect(res.redeemedTickets).toEqual(true);
      expect(redeemChannelSpy.mock.calls.length).toEqual(1);
    });
    it('does not try to redeem tickets if no tickets are pending', async function () {
      const redeemChannelSpy = jest.spyOn(sdk.api.tickets, 'redeemTickets');
      // mock hoprd node get channels
      nock(API_URL).get('/api/v2/channels').reply(200, {
        incoming: [],
        outgoing: []
      });

      // mock hoprd node tickets statistics
      nock(API_URL).get(`/api/v2/tickets/statistics`).reply(200, {
        pending: 0,
        unredeemed: 0,
        unredeemedValue: 'string',
        redeemed: 0,
        redeemedValue: 'string',
        losingTickets: 0,
        winProportion: 0,
        neglected: 0,
        rejected: 0,
        rejectedValue: 'string'
      });

      // mock hoprd redeem tickets
      nock(API_URL).post(`/api/v2/tickets/redeem`).reply(204);

      const res = await sdk.closeEverything();
      expect(res.closedChannels.length).toEqual(0);
      expect(res.redeemedTickets).toEqual(false);
      expect(redeemChannelSpy.mock.calls.length).toEqual(0);
    });
  });

  describe('cashOut', function () {
    it('does not call withdraw without balance', async function () {
      // mock hoprd node get balances
      nock(API_URL).get('/api/v2/account/balances').reply(200, {
        native: '0',
        hopr: '0'
      });
      const withdrawSpy = jest.spyOn(sdk.api.account, 'withdraw');

      const res = await sdk.cashOut({
        recipient: 'vitalik.eth'
      });

      expect(res.hopr).toEqual(undefined);
      expect(res.native).toEqual(undefined);
      expect(withdrawSpy.mock.calls.length).toEqual(0);
    });
    it('sends tx to recipient', async function () {
      // mock hoprd node get balances
      nock(API_URL).get('/api/v2/account/balances').reply(200, {
        native: '10',
        hopr: '10'
      });
      // mock hoprd node withdraw response
      const expectedReceipt = '0x123456789abcdef';
      nock(API_URL)
        .post('/api/v2/account/withdraw')
        .times(2)
        .reply(200, { receipt: expectedReceipt });
      const withdrawSpy = jest.spyOn(sdk.api.account, 'withdraw');

      const res = await sdk.cashOut({
        recipient: 'vitalik.eth'
      });

      expect(res.hopr).toEqual(expectedReceipt);
      expect(res.native).toEqual(expectedReceipt);
      expect(withdrawSpy.mock.calls.at(0)?.at(0)?.recipient).toEqual(
        'vitalik.eth'
      );
      expect(withdrawSpy.mock.calls.length).toEqual(2);
    });
  });

  describe('openMultipleChannels', function () {
    it('should not attempt to open channels if node does not have enough balance', async function () {
      // mock hoprd node get balances
      nock(API_URL).get('/api/v2/account/balances').reply(200, {
        native: '10',
        hopr: '0'
      });
      const openChannelSpy = jest.spyOn(sdk.api.channels, 'openChannel');

      const res = await sdk.openMultipleChannels({
        peerIds: ['id1', 'id2'],
        amount: '6'
      });

      expect(openChannelSpy.mock.calls.length).toEqual(0);
      expect(res).toEqual(undefined);
    });
    it('should open channels', async function () {
      const peerIds = ['id1', 'id2'];
      // mock hoprd node get balances
      nock(API_URL)
        .get('/api/v2/account/balances')
        .reply(200, {
          native: BigInt(0.03 * 10e18).toString(),
          hopr: '10'
        });

      // mock hoprd node open channel
      nock(API_URL).post('/api/v2/channels').times(peerIds.length).reply(201, {
        channelId:
          '0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5',
        receipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
      });

      const openChannelSpy = jest.spyOn(sdk.api.channels, 'openChannel');

      const res = await sdk.openMultipleChannels({
        peerIds,
        amount: '3'
      });

      expect(openChannelSpy.mock.calls.length).toEqual(peerIds.length);
      expect(res?.[peerIds.at(0) ?? '']).toEqual({
        channelId:
          '0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5',
        receipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
      });
    });
  });
});
