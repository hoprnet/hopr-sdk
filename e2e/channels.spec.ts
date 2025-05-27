import { GetChannelResponseType } from '../src';
import { HoprSDK as SDK } from '../src/sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

// first user
const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

// second user
const sdk2 = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_2!,
  apiToken: HOPRD_API_TOKEN!
});

// third user
const sdk3 = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_2!,
  apiToken: HOPRD_API_TOKEN!
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Channels E2E test', function () {
  test('gets the open channels', async function () {
    const secondPeerAddress = (await sdk2.api.account.getAddresses()).native;
    const response = await sdk.api.channels.getChannels();
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
    const openChannels = await sdk.api.channels.getChannels({
      includingClosed: false
    });

    const firstOpenOutgoingChannel = openChannels.outgoing.at(0);

    if (!firstOpenOutgoingChannel) {
      throw new Error('No open outgoing channel');
    }

    const response = await sdk.api.channels.getChannel({
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
      channelEpoch: expect.any(Number),
      closureTime: expect.any(Number)
    };

    expect(response).toStrictEqual(expectedResponse);
  }, 15e3);

  test('fund open channel', async function () {
    const response = await sdk.api.channels.getChannels();
    const secondPeerAddress = (await sdk2.api.account.getAddresses()).native;
    const outgoingChannel = response!.outgoing.find(
      (channel) => channel.peerAddress === secondPeerAddress
    );

    if (!outgoingChannel?.id) {
      throw Error('Could not get outgoing channel id');
    }

    const fundChannelResponse = await sdk.api.channels.fundChannel({
      amount: '100',
      channelId: outgoingChannel?.id
    });

    // wait for funding to get indexed
    await sleep(1_000);

    const newOutgoingChannel = await sdk.api.channels.getChannel({
      channelId: outgoingChannel.id
    });

    expect(fundChannelResponse).toBeDefined();
    expect(BigInt(newOutgoingChannel.balance)).toBeGreaterThan(
      BigInt(outgoingChannel.balance)
    );
  }, 120e3);

  test('aggregate tickets from a particular channel', async function () {
    // send msg 2 -> 1 -> 3
    const firstPeerAddresses = await sdk.api.account.getAddresses();
    const thirdPeerId = (await sdk3.api.account.getAddresses()).hopr;

    // await sdk2.api.messages.sendMessage({
    //   body: 'ticket',
    //   peerId: thirdPeerId,
    //   path: [firstPeerAddresses.hopr],
    //   tag: 0
    // });
    // wait for ticket to exist
    await sleep(1_000);

    const secondNodeChannels = await sdk2.api.channels.getChannels();
    const firstAndSecondNodeChannel = secondNodeChannels.outgoing.find(
      (ch) => ch.peerAddress === firstPeerAddresses.native
    );

    if (!firstAndSecondNodeChannel?.id) {
      throw new Error('Could not find channel between first and second node');
    }

    const firstNodeAggregate = await sdk.api.channels.aggregateChannelTickets({
      channelId: firstAndSecondNodeChannel?.id
    });

    expect(firstNodeAggregate).toBeTruthy();
  });

  // close channel after the tests are executed
  afterAll(async () => {
    const openChannels = await sdk.api.channels.getChannels({
      includingClosed: false
    });

    const firstOpenOutgoingChannel = openChannels.outgoing.at(0);

    if (!firstOpenOutgoingChannel) {
      throw new Error('No open outgoing channel');
    }

    const closeChannelResponse = await sdk.api.channels.closeChannel({
      channelId: firstOpenOutgoingChannel.id
    });

    expect(closeChannelResponse).toStrictEqual({
      receipt: expect.any(String),
      channelStatus: expect.any(String)
    });

    await sleep(5e3);
    const channel = await sdk.api.channels.getChannel({
      channelId: firstOpenOutgoingChannel.id
    });

    expect(['Closed', 'PendingToClose']).toContain(channel.status);
  }, 42e4);
});
