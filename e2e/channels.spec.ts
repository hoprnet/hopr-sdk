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
  let _2peerId: string;
  const sdk2 = new SDK({
    apiEndpoint: HOPRD_API_ENDPOINT_2!,
    apiToken: HOPRD_API_TOKEN!
  });
  // Open a channel before all the other tests are executed
  beforeAll(async () => {
    _2peerId = (await sdk2.api.account.getHoprAddress({})) as string;

    // Since `pluto` opens the channels already there's no need to "re-open" them
    // const openChannelResponse = await channels.openChannel({
    //   peerId: peerId,
    //   amount: '10000000'
    // });

    // if (typeof openChannelResponse === undefined) {
    //   throw new Error('Could not open a channel between 2 nodes');
    // }

    const _1PeerId = (await sdk.api.account.getHoprAddress({})) as string;
    await sdk2.api.messages.sendMessage({
      body: 'Message for ticket',
      recipient: _2peerId,
      path: [_1PeerId, _2peerId, _1PeerId]
    });
    sleep(30e3);
  }, 120e3);

  test('gets the open channels', async function () {
    const response = await channels.getChannels({});
    // Assert that the response has the expected properties
    expect(response).toHaveProperty('incoming');
    expect(response).toHaveProperty('outgoing');

    // Assert that the 'outgoing' array contains a specific channel
    const outgoingChannel = response!.outgoing.find(
      (channel) => channel.peerId === _2peerId
    );
    expect(outgoingChannel).toBeDefined();
  });

  test('gets the specified channel details', async function () {
    const response = await channels.getChannel({
      peerId: _2peerId,
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

  test('fund the specified channel', async function () {
    const response = await channels.fundChannels({
      peerId: _2peerId,
      outgoingAmount: '1000000',
      incomingAmount: '1000000'
    });

    expect(response).toStrictEqual({ receipt: expect.any(String) });
  }, 30e3);

  // close channel after the tests are executed
  afterAll(async () => {
    const closeChannelResponse = await channels.closeChannel({
      peerId: _2peerId,
      direction: 'outgoing'
    });

    expect(closeChannelResponse).toStrictEqual({
      receipt: expect.any(String),
      channelStatus: expect.any(String)
    });

    await sleep(5e3);
    const channel = await channels.getChannel({
      direction: 'outgoing',
      peerId: _2peerId
    });

    expect(channel?.status).toBe('PendingToClose');
  }, 42e4);
});
