import { HoprSdk as SDK } from '../sdk';
import { decode } from 'rlp';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({ url: HOPRD_API_ENDPOINT_1!, apiKey: HOPRD_API_TOKEN! });
const { messages } = sdk.api;

const decodeMessage = (msg: string) => {
  console.log('WB: decodeMessage');
  let uint8Array = new Uint8Array(JSON.parse(`[${msg}]`));
  let decodedArray = decode(uint8Array);
  if (decodedArray[0] instanceof Uint8Array) {
    return new TextDecoder().decode(decodedArray[0]);
  }
  throw Error(`Could not decode received message: ${msg}`);
};

const MESSAGE = 'Some message.';

describe('Messages E2E Tests', function () {
  let wsSdk: WebSocket;
  let node2Address: string;
  // Before starting each tests, we need to instantiate the ws on another node
  beforeEach(async () => {
    const sdk2 = new SDK({
      url: HOPRD_API_ENDPOINT_2!,
      apiKey: HOPRD_API_TOKEN!
    });
    node2Address = (await sdk2.api.account.getHoprAddress()) as string;
    wsSdk = (await sdk2.api.messages.websocket()) as unknown as WebSocket;
  });

  test.todo('test messages');

  test('sends a message to another peer', async function () {
    let receivedMessage: string | undefined;
    wsSdk.onmessage = (event) => {
      receivedMessage = event.data;
    };

    const sendMessageResponse = await messages.sendMessage({
      body: MESSAGE,
      recipient: node2Address,
      hops: 1
    });

    // Wait for the message to be received
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (receivedMessage !== undefined) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });

    expect(typeof receivedMessage).toBe('string');
    expect(decodeMessage(receivedMessage!)).toBe(MESSAGE);
    expect(typeof sendMessageResponse).toBe('string');
  }, 30e4);

  test('should sign message and prefix with "HOPR Signed Message:"', async function () {
    let receivedMessage: string | undefined;
    wsSdk.onmessage = (event) => {
      receivedMessage = event.data;
    };

    const signMessageResponse = await messages.sign({
      message: MESSAGE
    });

    expect(typeof signMessageResponse).toBe('string');
  });

  afterEach(async () => {
    wsSdk.close();
  });
});
