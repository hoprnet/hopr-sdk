import nock from 'nock';
import { withdraw } from './withdraw';
import { sdkApiError } from '../../utils';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const CURRENCY = 'NATIVE';
const AMOUNT = '1337';
const ETHEREUM_ADDRESS = '1.339446426793328e+48';

describe('withdraw function', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return receipt when withdraw is successful', async function () {
    const expectedReceipt = '0x123456789abcdef';
    const mockResponse = { receipt: expectedReceipt };
    nock(API_ENDPOINT)
      .post('/api/v3/account/withdraw')
      .reply(200, mockResponse);

    const actualResult = await withdraw({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      currency: CURRENCY,
      amount: AMOUNT,
      ethereumAddress: ETHEREUM_ADDRESS
    });

    expect(actualResult).toEqual(expectedReceipt);
  });

  test('should return 400 when withdraw fails with incorrect data', async function () {
    const expectedStatus = 'INVALID_CURRENCY | INVALID_AMOUNT';
    const mockResponse = { status: expectedStatus };
    nock(API_ENDPOINT)
      .post('/api/v3/account/withdraw')
      .reply(400, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        currency: CURRENCY,
        amount: AMOUNT,
        ethereumAddress: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 401 when authentication fails', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/account/withdraw')
      .reply(401, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        currency: CURRENCY,
        amount: AMOUNT,
        ethereumAddress: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 403 when authorization fails', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/account/withdraw')
      .reply(403, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        currency: CURRENCY,
        amount: AMOUNT,
        ethereumAddress: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 422 when withdraw amount exceeds current balance', async function () {
    const expectedStatus = 'NOT_ENOUGH_BALANCE';
    const mockResponse = { status: expectedStatus };
    nock(API_ENDPOINT)
      .post('/api/v3/account/withdraw')
      .reply(422, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        currency: CURRENCY,
        amount: AMOUNT,
        ethereumAddress: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
});
