import { HoprSDK as SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;
const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});
const { channels } = sdk.api;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Channels E2E test', function () {
  let peerId: string;
  const sdk2 = new SDK({
    apiEndpoint: HOPRD_API_ENDPOINT_2!,
    apiToken: HOPRD_API_TOKEN!
  });
  // Open a channel before all the other tests are executed
  beforeAll(async () => {
    peerId = (await sdk2.api.account.getHoprAddress()) as string;
    const openChannelResponse = await channels.openChannel({
      peerId: peerId,
      amount: '10000000'
    });

    if (typeof openChannelResponse === undefined) {
      throw new Error('Could not open a channel between 2 nodes');
    }
  });

  test('gets the open channels', async function () {
    const response = await channels.getChannels();
    // Assert that the response has the expected properties
    expect(response).toHaveProperty('incoming');
    expect(response).toHaveProperty('outgoing');

    // Assert that the 'outgoing' array contains a specific channel
    const outgoingChannel = response!.outgoing.find(
      (channel) => channel.peerId === peerId
    );
    expect(outgoingChannel).toBeDefined();
  });

  test('gets the specified channel details', async function () {
    const response = await channels.getChannel({
      peerId: peerId,
      direction: 'outgoing'
    });

    expect(response).toStrictEqual({
      type: expect.any(String),
      channelId: expect.any(String),
      peerId: expect.any(String),
      status: expect.any(String),
      balance: expect.any(String)
    });
  }, 15e3);

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
  test.skip('gets the tickets earned from a particular channel', async function () {
    const response = await channels.getChannelTickets({ peerId: peerId });

    expect(response).toStrictEqual({
      counterparty: expect.any(String),
      challenge: expect.any(String),
      epoch: expect.any(String),
      index: expect.any(String),
      amount: expect.any(String),
      winProb: expect.any(String),
      channelEpoch: expect.any(String),
      signature: expect.any(String)
    });
  }, 30e3);

  test('fund the specified channel', async function () {
    const response = await channels.fundChannels({
      peerId: peerId,
      outgoingAmount: '1000000',
      incomingAmount: '1000000'
    });

    expect(response).toStrictEqual({ receipt: expect.any(String) });
  }, 30e3);

  // FIXME: This needs to be checked
  test.skip('redeem tickets from a particular channel', async function () {
    const response = await channels.redeemChannelTickets({ peerId: peerId });

    expect(response).toBe(true);
  });

  // close channel after the tests are executed
  afterAll(async () => {
    const closeChannelResponse = await channels.closeChannel({
      peerId: peerId,
      direction: 'outgoing'
    });

    expect(closeChannelResponse).toStrictEqual({
      receipt: expect.any(String),
      channelStatus: expect.any(String)
    });

    await sleep(5e3);
    const channel = await channels.getChannel({
      direction: 'outgoing',
      peerId: peerId
    });

    expect(channel?.status).toBe('PendingToClose');
  }, 42e4);
});
