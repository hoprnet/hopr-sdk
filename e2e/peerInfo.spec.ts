import { GetPeerResponseType, PingPeerResponseType } from '../src';
import { HoprSDK as SDK } from '../src/sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});
const { peerInfo } = sdk.api;

const sdk2 = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_2!,
  apiToken: HOPRD_API_TOKEN!
});

describe('peerInfo E2E Tests', function () {
  test('should get information about this peer', async function () {
    const peerId = (await sdk2.api.account.getHoprAddress({})) as string;
    const response = await peerInfo.getPeer({ peerId });

    const expectedResponse: GetPeerResponseType = {
      announced: expect.any(Array<String>),
      observed: expect.any(Array<String>)
    };

    expect(response).toStrictEqual(expectedResponse);
  });

  test('should get the latency of the node specified', async function () {
    const peerId = (await sdk2.api.account.getHoprAddress({})) as string;
    const response = await sdk.api.peers.pingPeer({ peerId: peerId });
    const expectedResponse: PingPeerResponseType = {
      latency: expect.any(Number),
      reportedVersion: expect.any(String)
    };

    expect(response).toStrictEqual(expectedResponse);
  });
});
