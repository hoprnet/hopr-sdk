import { GetBalancesResponseType } from '../src';
import { HoprSDK as SDK } from '../src/sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;
let nativeAddress: string;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

describe('Account E2E tests', function () {
  it('receives the hopr and native node address', async function () {
    const response = await sdk.api.account.getAddresses();

    expect(response).toStrictEqual({
      hopr: expect.any(String),
      native: expect.any(String)
    });
  });

  it('receives the hopr address', async function () {
    const response = await sdk.api.account.getHoprAddress();

    expect(typeof response).toEqual('string');
  });

  it('receives the native address', async function () {
    nativeAddress = (await sdk.api.account.getNativeAddress()) as string;

    expect(typeof nativeAddress).toEqual('string');
  });

  it('receives the hopr and native balances', async function () {
    const response = await sdk.api.account.getBalances();

    const expectedResponse: GetBalancesResponseType = {
      hopr: expect.any(String),
      native: expect.any(String),
      safeHopr: expect.any(String),
      safeHoprAllowance: expect.any(String),
      safeNative: expect.any(String)
    };

    expect(response).toStrictEqual(expectedResponse);
  });

  it('receives the hopr balance', async function () {
    const response = await sdk.api.account.getHoprBalance();

    expect(typeof response).toEqual('string');
  });

  it('receives the native balance', async function () {
    const response = await sdk.api.account.getNativeBalance();

    expect(typeof response).toEqual('string');
  });

  it('withdraws HOPR balance', async function () {
    const response = await sdk.api.account.withdraw({
      currency: 'HOPR',
      amount: '10000',
      address: nativeAddress
    });

    expect(typeof response).toEqual('string');
  }, 30e3);

  it('withdraws NATIVE balance', async function () {
    const response = await sdk.api.account.withdraw({
      currency: 'NATIVE',
      amount: '10000',
      address: nativeAddress
    });

    expect(typeof response).toEqual('string');
  }, 30e3);
});
