import { HoprSDK as SDK } from '../src/sdk';
const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

const sdk2 = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_2!,
  apiToken: HOPRD_API_TOKEN!
});

const MESSAGE = 'Some message.';

describe('Messages E2E Tests', function () {
  test('sends a message to another peer', async function () {
    const node2PeerId = (await sdk2.api.account.getHoprAddress()) as string;
    const messageReceipt = await sdk.api.messages.sendMessage({
      body: MESSAGE,
      peerId: node2PeerId,
      path: [],
      tag: 0
    });
    expect(messageReceipt).not.toBe(undefined);
  });
});
