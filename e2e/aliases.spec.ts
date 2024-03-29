import { HoprSDK as SDK } from '../src/sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

describe('Aliases E2E test', function () {
  let peerId: string;
  const testAlias = 'NodeTest';

  // Set Alias before all the other tests are executed
  beforeAll(async () => {
    peerId = (await new SDK({
      apiEndpoint: HOPRD_API_ENDPOINT_2!,
      apiToken: HOPRD_API_TOKEN!
    }).api.account.getHoprAddress()) as string;

    const setAliasResponse = await sdk.api.aliases.setAlias({
      peerId: peerId,
      alias: testAlias
    });

    if (setAliasResponse !== true) {
      throw new Error("Couldn't set an alias.");
    }
  });

  test('gets the aliases set', async function () {
    const response = await sdk.api.aliases.getAliases();

    expect(response).toStrictEqual(
      expect.objectContaining({
        [testAlias]: peerId
      })
    );
  });

  test('gets the peerId for a specific alias', async function () {
    const response = await sdk.api.aliases.getAlias({ alias: testAlias });

    expect(response).toEqual(peerId);
  });
  // Remove alias after the tests are executed
  afterAll(async () => {
    const removeAliasResponse = await sdk.api.aliases.removeAlias({
      alias: testAlias
    });

    expect(removeAliasResponse).toBe(true);
  });
});
