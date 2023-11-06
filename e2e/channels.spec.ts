import { GetChannelResponseType } from '../src';
import { HoprSDK as SDK } from '../src/sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;
const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});
const { channels } = sdk.api;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Channels E2E test', function () {
  let secondPeerAddress: string;
  const sdk2 = new SDK({
    apiEndpoint: HOPRD_API_ENDPOINT_2!,
    apiToken: HOPRD_API_TOKEN!
  });
  // Open a channel before all the other tests are executed
  beforeAll(async () => {
    secondPeerAddress = (await sdk2.api.account.getAddresses()).native;
  });

  test('gets the open channels', async function () {
    const response = await channels.getChannels();
    // Assert that the response has the expected properties
    expect(response).toHaveProperty('incoming');
    expect(response).toHaveProperty('outgoing');

    // Assert that the 'outgoing' array contains a specific channel
    const outgoingChannel = response!.outgoing.find(
      (channel) => channel.peerAddress === secondPeerAddress
    );
    expect(outgoingChannel).toBeDefined();
  });

  test('gets the specified channel details', async function () {
    const openChannels = await channels.getChannels({
      includingClosed: false
    });

    const firstOpenOutgoingChannel = openChannels.outgoing.at(0);

    if (!firstOpenOutgoingChannel) {
      throw new Error('No open outgoing channel');
    }

    const response = await channels.getChannel({
      channelId: firstOpenOutgoingChannel?.id
    });

    const expectedResponse: GetChannelResponseType = {
      channelId: expect.any(String),
      status: expect.any(String),
      balance: expect.any(String),
      sourcePeerId: expect.any(String),
      destinationPeerId: expect.any(String),
      sourceAddress: expect.any(String),
      destinationAddress: expect.any(String),
      ticketIndex: expect.any(String),
      channelEpoch: expect.any(String),
      closureTime: expect.any(String)
    };

    expect(response).toStrictEqual(expectedResponse);
  }, 15e3);

  test('fund open channel', async function () {
    const response = await channels.getChannels();

    const outgoingChannel = response!.outgoing.find(
      (channel) => channel.peerAddress === secondPeerAddress
    );

    if (!outgoingChannel?.id) {
      throw Error('Could not get outgoing channel id');
    }

    const fundChannelResponse = await channels.fundChannel({
      amount: '100',
      channelId: outgoingChannel?.id
    });

    // wait for funding to get indexed
    await sleep(1_000);

    const newOutgoingChannel = await channels.getChannel({
      channelId: outgoingChannel.id
    });

    expect(fundChannelResponse.receipt).toBeDefined();
    expect(BigInt(newOutgoingChannel.balance)).toBeGreaterThan(
      BigInt(outgoingChannel.balance)
    );
  }, 120e3);

  // FIXME: This needs to be checked
  // test(
  //   'redeem tickets from a particular channel',
  //   async function () {
  //     console.log(3);
  //     sleep(60e3);

  //     const response = await channels.redeemChannelTickets({
  //       peerId: _2peerId
  //     });
  //     console.log(response);

  //     expect(response).toBe(true);
  //   },
  //   60e3 * 5
  // );

  // FIXME: If no tickets earned then we will get:
  /**
   APIError
   at /Users/luismartinez/Documents/hopr-sdk/src/api/channels/getChannelTickets.ts:35:11
   at Generator.next (<anonymous>)
   at fulfilled (/Users/luismartinez/Documents/hopr-sdk/src/api/channels/getChannelTickets.ts:5:58)
   at processTicksAndRejections (node:internal/process/task_queues:96:5) {
     status: 'TICKETS_NOT_FOUND',
     error: undefined
    }
    */
  // test(
  //   'gets the tickets earned from a particular channel',
  //   async function () {
  //     console.log(4);
  //     sleep(60e3);
  //     const response = await channels.getChannelTickets({ peerId: _2peerId });
  //     console.log(response);
  //     expect(response).toStrictEqual({
  //       counterparty: expect.any(String),
  //       challenge: expect.any(String),
  //       epoch: expect.any(String),
  //       index: expect.any(String),
  //       amount: expect.any(String),
  //       winProb: expect.any(String),
  //       channelEpoch: expect.any(String),
  //       signature: expect.any(String)
  //     });
  //   },
  //   60e3 * 5
  // );

  // close channel after the tests are executed
  afterAll(async () => {
    const openChannels = await channels.getChannels({
      includingClosed: false
    });

    const firstOpenOutgoingChannel = openChannels.outgoing.at(0);

    if (!firstOpenOutgoingChannel) {
      throw new Error('No open outgoing channel');
    }

    const closeChannelResponse = await channels.closeChannel({
      channelId: firstOpenOutgoingChannel.id
    });

    expect(closeChannelResponse).toStrictEqual({
      receipt: expect.any(String),
      channelStatus: expect.any(String)
    });

    await sleep(5e3);
    const channel = await channels.getChannel({
      channelId: firstOpenOutgoingChannel.id
    });

    expect(['Closed', 'PendingToClose']).toContain(channel.status);
  }, 42e4);
});
