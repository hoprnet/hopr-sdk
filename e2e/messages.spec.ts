import { HoprSDK as SDK } from '../src/sdk';
import { decodeMessage } from '../src/utils';
const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

const secondSdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_2!,
  apiToken: HOPRD_API_TOKEN!
});

const MESSAGE = 'Some message.';

describe('Messages E2E Tests', function () {
  let node2PeerId: string;
  // Before starting each tests, we need to instantiate the ws on another node
  beforeEach(async () => {
    const sdk2 = new SDK({
      apiEndpoint: HOPRD_API_ENDPOINT_2!,
      apiToken: HOPRD_API_TOKEN!
    });
    node2PeerId = (await sdk2.api.account.getHoprAddress({})) as string;
    console.log(node2PeerId);
  });
  // The message never arrives so it stalls all the tests from this file
  test('sends a message to another peer', async function () {
    const messageReceipt = await sdk.api.messages.sendMessage({
      body: MESSAGE,
      peerId: node2PeerId,
      path: [],
      tag: 0
    });

    expect(messageReceipt).not.toBe(undefined);
  });
});
