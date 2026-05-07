import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { withdraw } from './withdraw';
import { sdkApiError } from '../../utils';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const CURRENCY = 'NATIVE';
const AMOUNT = '1337 wxHOPR';
const ETHEREUM_ADDRESS = '1.339446426793328e+48';

const startHangingServer = async () => {
  nock.enableNetConnect('127.0.0.1');
  const server = http.createServer(() => {});
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve())
  );
  const port = (server.address() as any).port;
  const stop = async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    nock.disableNetConnect();
  };
  return { url: `http://127.0.0.1:${port}`, stop };
};

describe('withdraw function', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return receipt when withdraw is successful', async function () {
    const expectedReceipt = '0x123456789abcdef';
    const mockResponse = { receipt: expectedReceipt };
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(200, mockResponse);

    const actualResult = await withdraw({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      amount: AMOUNT,
      address: ETHEREUM_ADDRESS
    });

    expect(actualResult).toEqual(expectedReceipt);
  });

  test('should return 400 when withdraw fails with incorrect data', async function () {
    const expectedStatus = 'INVALID_CURRENCY | INVALID_AMOUNT';
    const mockResponse = { status: expectedStatus };
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(400, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 401 when authentication fails', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(401, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 403 when authorization fails', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(403, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 412 when withdraw amount exceeds current balance', async function () {
    const expectedStatus = 'the node is not ready';
    const mockResponse = { status: expectedStatus };
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(412, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 422 when withdraw amount exceeds current balance', async function () {
    const expectedStatus = 'NOT_ENOUGH_BALANCE';
    const mockResponse = { status: expectedStatus };
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(422, mockResponse);

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should throw ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(200, { unexpected: 'value' });

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(ZodError);
  });

  test('should reject with TIMEOUT when request exceeds timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        withdraw({
          apiToken: API_TOKEN,
          apiEndpoint: url,
          amount: AMOUNT,
          address: ETHEREUM_ADDRESS,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });

  test('should reject when the connection errors', async function () {
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .replyWithError('ECONNREFUSED');

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow();
  });

  test('should reject when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(200, 'not-json');

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow();
  });

  test('should throw sdkApiError when the api responds with a 500', async function () {
    nock(API_ENDPOINT)
      .post('/api/v4/account/withdraw')
      .reply(500, { status: 'INTERNAL_SERVER_ERROR' });

    await expect(
      withdraw({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        amount: AMOUNT,
        address: ETHEREUM_ADDRESS
      })
    ).rejects.toThrow(sdkApiError);
  });
});
