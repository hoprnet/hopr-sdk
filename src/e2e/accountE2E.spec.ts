import { SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;
let nativeAddress: string;

const sdk = new SDK(HOPRD_API_ENDPOINT_1!, HOPRD_API_TOKEN!);
const { account } = sdk.api;
describe('Account E2E tests', function () {
  it('receives the hopr and native node address', async function () {
    const response = await account.getAddresses();

    expect(response).toEqual(
      expect.objectContaining({
        hopr: expect.any(String),
        native: expect.any(String)
      })
    );
  });

  it('receives the hopr address', async function () {
    const response = await account.getHoprAddress();

    expect(typeof response).toEqual('string');
  });

  it('receives the native address', async function () {
    nativeAddress = await account.getNativeAddress();

    expect(typeof nativeAddress).toEqual('string');
  });

  it('receives the hopr and native balances', async function () {
    const response = await account.getBalances();

    expect(response).toEqual(
      expect.objectContaining({
        hopr: expect.any(String),
        native: expect.any(String)
      })
    );
  });

  it('receives the hopr balance', async function () {
    const response = await account.getHoprBalance();

    expect(typeof response).toEqual('string');
  });

  it('receives the native balance', async function () {
    const response = await account.getNativeBalance();

    expect(typeof response).toEqual('string');
  });

  it('withdraws HOPR balance', async function () {
    const response = await account.withdraw({
      currency: 'HOPR',
      amount: '100000000',
      recipient: nativeAddress
    });

    expect(typeof response).toEqual('string');
  }, 30e3);

  it('withdraws NATIVE balance', async function () {
    const response = await account.withdraw({
      currency: 'NATIVE',
      amount: '100000000',
      recipient: nativeAddress
    });

    expect(typeof response).toEqual('string');
  }, 30e3);
});
