import { HoprSdk as SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({ url: HOPRD_API_ENDPOINT_1!, apiToken: HOPRD_API_TOKEN! });
const { node } = sdk.api;

const SDK2 = new SDK({
  url: HOPRD_API_ENDPOINT_2!,
  apiToken: HOPRD_API_TOKEN!
});
describe('Node E2E Tests', function () {
  test('should gets release version of the running node', async function () {
    const version = await node.getVersion();

    expect(typeof version).toBe('string');
  });

  test('should get the list of connected and announced peers', async function () {
    const response = await node.getPeers({ quality: 0.7 });

    expect(response).toStrictEqual({
      connected: expect.arrayContaining([
        expect.objectContaining({
          quality: expect.any(Number),
          peerId: expect.any(String),
          multiAddr: expect.any(String),
          heartbeats: expect.objectContaining({
            sent: expect.any(Number),
            success: expect.any(Number)
          }),
          lastSeen: expect.any(Number),
          backoff: expect.any(Number),
          isNew: expect.any(Boolean)
        })
      ]),
      announced: expect.arrayContaining([
        expect.objectContaining({
          quality: expect.any(Number),
          peerId: expect.any(String),
          multiAddr: expect.any(String),
          heartbeats: expect.objectContaining({
            sent: expect.any(Number),
            success: expect.any(Number)
          }),
          lastSeen: expect.any(Number),
          backoff: expect.any(Number),
          isNew: expect.any(Boolean)
        })
      ])
    });
  });

  test('should get prometheus metrics from the node', async function () {
    const metrics = await node.getMetrics();

    expect(typeof metrics).toBe('string');
  });

  test('should get the nodes info', async function () {
    const info = await node.getInfo();

    expect(info).toStrictEqual({
      environment: expect.any(String),
      announcedAddress: expect.any(Array),
      listeningAddress: expect.any(Array),
      network: expect.any(String),
      hoprToken: expect.any(String),
      hoprChannels: expect.any(String),
      //   In pluto theres no network registry
      //   hoprNetworkRegistryAddress: expect.any(String),
      connectivityStatus: 'Green',
      isEligible: true,
      channelClosurePeriod: expect.any(Number)
    });
  });

  test('should get a list of known entry nodes', async function () {
    const entryNodes = await node.getEntryNodes();

    // Since there are many objects with string keys, we will only compare the contents of the first one
    const firstKey = Object.keys(entryNodes!)[0] as string;

    expect(entryNodes![firstKey]).toEqual(
      expect.objectContaining({
        multiaddrs: expect.arrayContaining([expect.any(String)]),
        isEligible: true
      })
    );
  });

  test('should get the latency of the node specified', async function () {
    const peerId = (await SDK2.api.account.getHoprAddress()) as string;
    const response = await node.pingNode({ peerId: peerId });

    expect(response).toStrictEqual({
      latency: expect.any(Number)
    });
  });
});
