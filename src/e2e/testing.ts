import { HoprSDK as SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;
const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});
const { channels } = sdk.api;

let peerId: string;
const sdk2 = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_2!,
  apiToken: HOPRD_API_TOKEN!
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const first = async () => {
  peerId = (await sdk2.api.account.getHoprAddress()) as string;
  //   const openChannelResponse = await channels.openChannel({
  //     peerId: peerId,
  //     amount: '10000000'
  //   });

  //   if (typeof openChannelResponse === undefined) {
  //     throw new Error('Could not open a channel between 2 nodes');
  //   }
  const _1PeerId = (await sdk.api.account.getHoprAddress()) as string;
  await sdk2.api.messages.sendMessage({
    body: 'Message for ticket',
    recipient: peerId,
    path: [_1PeerId, peerId, _1PeerId]
  });
  //   const responseChannel = await channels.getChannels();
  //   console.log(responseChannel);

  await sleep(5e3);
  const getChannelTicketResponse = await channels.getChannelTickets({
    peerId: peerId
  });
  console.log(getChannelTicketResponse);
  //   await sleep(15e3);

  //   const redeemTicketResponse = await channels.redeemChannelTickets({
  //     peerId: peerId
  //   });
  //   console.log(redeemTicketResponse);
};

first();
