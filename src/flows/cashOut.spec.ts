import nock from 'nock';
import { cashOut } from './';
import * as account from '../api/account';
import { GetBalancesResponseType } from '../types';

jest.mock('../api/account', () => ({
  ...jest.requireActual('../api/account'),
  withdraw: jest.fn()
}));

// Set up global constants for URL and API key
const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('cashOut', function () {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('does not call withdraw without balance', async function () {
    // mock hoprd node get balances
    const apiResponse: GetBalancesResponseType = {
      native: '0 xDAI',
      hopr: '0 wxHOPR',
      safeHopr: '0 wxHOPR',
      safeNative: '0 xDAI',
      safeHoprAllowance: '0 wxHOPR'
    };

    const expectedResponse: GetBalancesResponseType = {
      native: '0',
      hopr: '0',
      safeHopr: '0',
      safeNative: '0',
      safeHoprAllowance: '0',
      token: 'wxHOPR'
    };

    nock(API_ENDPOINT)
      .get('/api/v4/account/balances')
      .reply(200, apiResponse);

    const res = await cashOut({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      address: 'vitalik.eth'
    });

    expect(res.hopr).toEqual(undefined);
    expect(res.native).toEqual(undefined);
    expect((account.withdraw as jest.Mock).mock.calls.length).toEqual(0);
  });
  it('sends tx to recipient', async function () {
    // mock hoprd node get balances
    const apiResponse: GetBalancesResponseType = {
      native: '10 xDAI',
      hopr: '10 wxHOPR',
      safeHopr: '0 wxHOPR',
      safeNative: '0 xDAI',
      safeHoprAllowance: '0 wxHOPR'
    };

    const expectedResponse: GetBalancesResponseType = {
      native: '0',
      hopr: '0',
      safeHopr: '0',
      safeNative: '0',
      safeHoprAllowance: '0',
      token: 'wxHOPR'
    };


    nock(API_ENDPOINT)
      .get('/api/v4/account/balances')
      .reply(200, apiResponse);

    // mock hoprd node withdraw response
    const expectedReceipt = '0x123456789abcdef';
    (account.withdraw as jest.Mock).mockImplementation(() => expectedReceipt);

    const res = await cashOut({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      address: 'vitalik.eth'
    });

    expect(res.hopr).toEqual(expectedReceipt);
    expect(res.native).toEqual(expectedReceipt);
    expect(
      (account.withdraw as jest.Mock).mock.calls.at(0)?.at(0)?.address
    ).toEqual('vitalik.eth');
    expect((account.withdraw as jest.Mock).mock.calls.length).toEqual(2);
  });
});
