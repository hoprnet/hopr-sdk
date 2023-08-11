import nock from 'nock';
import { closeEverything } from './index';
import * as channels from '../api/channels';
import * as tickets from '../api/tickets';

jest.mock('../api/channels', () => ({
  ...jest.requireActual('../api/channels'),
  closeChannel: jest.fn()
}));
jest.mock('../api/tickets', () => ({
  ...jest.requireActual('../api/tickets'),
  redeemTickets: jest.fn()
}));

// Set up global constants for URL and API key
const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('closeEverything', function () {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('closes open channels', async function () {
    const openOutgoingChannels = ['1', '2', '3'];
    // mock hoprd node get channels
    nock(API_ENDPOINT)
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
    nock(API_ENDPOINT).get(`/api/v2/tickets/statistics`).reply(200, {
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
      (channels.closeChannel as jest.Mock).mockImplementation(() => ({
        receipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e',
        channelStatus: 'Closed'
      }));
    });

    const res = await closeEverything({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });
    expect(res.closedChannels.length).toBeGreaterThan(0);
    expect(res.closedChannels.length).toEqual(openOutgoingChannels.length);
    expect(res.redeemedTickets).toEqual(false);
    expect((channels.closeChannel as jest.Mock).mock.calls.length).toEqual(
      openOutgoingChannels.length
    );
  });
  it('does not close channels that are not open', async function () {
    const openOutgoingChannels = ['1', '2', '3'];
    // mock hoprd node get channels
    nock(API_ENDPOINT)
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
    nock(API_ENDPOINT).get(`/api/v2/tickets/statistics`).reply(200, {
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
      nock(API_ENDPOINT).delete(`/api/v2/channels/${id}/outgoing`).reply(200, {
        receipt:
          '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e',
        channelStatus: 'Closed'
      });
    });

    const res = await closeEverything({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });
    expect(res.closedChannels.length).toEqual(0);
    expect(res.redeemedTickets).toEqual(false);
    expect((channels.closeChannel as jest.Mock).mock.calls.length).toEqual(0);
  });

  it('redeems pending tickets', async function () {
    // mock hoprd node get channels
    nock(API_ENDPOINT).get('/api/v2/channels').reply(200, {
      incoming: [],
      outgoing: []
    });

    // mock hoprd node tickets statistics
    nock(API_ENDPOINT).get(`/api/v2/tickets/statistics`).reply(200, {
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
    // nock(API_ENDPOINT).post(`/api/v2/tickets/redeem`).reply(204);
    (tickets.redeemTickets as jest.Mock).mockImplementation(() => true);

    const res = await closeEverything({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });
    expect(res.closedChannels.length).toEqual(0);
    expect(res.redeemedTickets).toEqual(true);
    expect((tickets.redeemTickets as jest.Mock).mock.calls.length).toEqual(1);
  });
  it('does not try to redeem tickets if no tickets are pending', async function () {
    // mock hoprd node get channels
    nock(API_ENDPOINT).get('/api/v2/channels').reply(200, {
      incoming: [],
      outgoing: []
    });

    // mock hoprd node tickets statistics
    nock(API_ENDPOINT).get(`/api/v2/tickets/statistics`).reply(200, {
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
    (tickets.redeemTickets as jest.Mock).mockImplementation(() => false);

    const res = await closeEverything({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });
    expect(res.closedChannels.length).toEqual(0);
    expect(res.redeemedTickets).toEqual(false);
    expect((tickets.redeemTickets as jest.Mock).mock.calls.length).toEqual(0);
  });
});
