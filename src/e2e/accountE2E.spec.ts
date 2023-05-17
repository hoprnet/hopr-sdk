import { SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;

const sdk = new SDK(HOPRD_API_ENDPOINT_1!, HOPRD_API_TOKEN!);
const { account } = sdk.api;
describe('Account E2E tests', function () {
  it('Test', async function () {
    const response = await account.getAddresses();

    expect(response).toEqual(
      expect.objectContaining({
        hopr: expect.any(String),
        native: expect.any(String)
      })
    );
  });
});
