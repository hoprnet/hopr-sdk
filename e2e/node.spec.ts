import { GetInfoResponseType, GetPeersResponseType } from '../src';
import { HoprSDK as SDK } from '../src/sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

describe('Node E2E Tests', function () {
  test('should gets release version of the running node', async function () {
    const version = await sdk.api.node.getVersion();

    expect(typeof version).toBe('string');
  });

  test('should get the list of connected and announced peers', async function () {
    const response = await sdk.api.node.getPeers({ quality: 0.7 });

    const expectedPeer: GetPeersResponseType['connected'][0] = {
      quality: expect.any(Number),
      peerId: expect.any(String),
      peerAddress: expect.any(String),
      multiAddr: expect.any(String),
      heartbeats: expect.objectContaining({
        sent: expect.any(Number),
        success: expect.any(Number)
      }),
      lastSeen: expect.any(Number),
      backoff: expect.any(Number),
      reportedVersion: expect.any(String),
      isNew: expect.any(Boolean)
    };

    const expectedResponse: GetPeersResponseType = {
      connected: expect.arrayContaining([
        expect.objectContaining(expectedPeer)
      ]),
      announced: expect.arrayContaining([expect.objectContaining(expectedPeer)])
    };

    expect(response).toStrictEqual(expectedResponse);
  });

  test('should get prometheus metrics from the node', async function () {
    const metrics = await sdk.api.node.getMetrics();

    expect(typeof metrics).toBe('string');
  });

  test('should get the nodes info', async function () {
    const info = await sdk.api.node.getInfo();

    const expectedResponse: GetInfoResponseType = {
      announcedAddress: expect.any(Array),
      listeningAddress: expect.any(Array),
      network: expect.any(String),
      hoprToken: expect.any(String),
      hoprChannels: expect.any(String),
      connectivityStatus: expect.any(String),
      isEligible: expect.any(Boolean),
      channelClosurePeriod: expect.any(Number),
      chain: expect.any(String),
      nodeManagementModule: expect.any(String),
      nodeSafe: expect.any(String)
    };

    expect(info).toStrictEqual(expectedResponse);
  });

  test('should get a list of known entry nodes', async function () {
    const entryNodes = await sdk.api.node.getEntryNodes();

    // Since there are many objects with string keys, we will only compare the contents of the first one
    const firstKey = Object.keys(entryNodes!)[0] as string;

    expect(entryNodes![firstKey]).toEqual(
      expect.objectContaining({
        multiaddrs: expect.arrayContaining([expect.any(String)]),
        isEligible: true
      })
    );
  });
});
