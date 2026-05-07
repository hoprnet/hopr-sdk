import { ZodError } from 'zod';
import http from 'http';
import { sdkApiError } from '../../utils';
import { getAddresses } from './getAddresses';
import nock from 'nock';
import { GetAddressesResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

const startHangingServer = async () => {
  nock.enableNetConnect('127.0.0.1');
  const server = http.createServer(() => {
    /* never respond */
  });
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

describe('getAddresses', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return the HOPR and native addresses if 200', async function () {
    const expectedResponse: GetAddressesResponseType = {
      native: '0x123abc'
    };

    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .reply(200, expectedResponse);

    const result = await getAddresses({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });
    expect(result).toEqual(expectedResponse);
  });

  test('should return 403 if authentication failed', async function () {
    const invalidApiToken = 'Not valid';
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .reply(403, expectedResponse);

    await expect(
      getAddresses({ apiEndpoint: API_ENDPOINT, apiToken: invalidApiToken })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 403 if authorization fails', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .reply(403, expectedResponse);

    await expect(
      getAddresses({ apiEndpoint: API_ENDPOINT, apiToken: API_TOKEN })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 422 if there is an unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .reply(422, expectedResponse);

    await expect(
      getAddresses({ apiEndpoint: API_ENDPOINT, apiToken: API_TOKEN })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return ZodError if there is a parsing error', async function () {
    const expectedResponse = {
      native: null
    };

    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .reply(200, expectedResponse);

    await expect(
      getAddresses({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN
      })
    ).rejects.toThrow(ZodError);
  });

  test('should throw Error on internal server error', async function () {
    const expectedResponse = {
      native: null
    };

    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .reply(500, expectedResponse);

    await expect(
      getAddresses({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN
      })
    ).rejects.toThrow(Error);
  });

  test('should throw ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .reply(200, { unexpectedField: 'nope' });

    await expect(
      getAddresses({ apiEndpoint: API_ENDPOINT, apiToken: API_TOKEN })
    ).rejects.toThrow(ZodError);
  });

  test('should reject with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getAddresses({
          apiEndpoint: url,
          apiToken: API_TOKEN,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });

  test('should reject when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .replyWithError('ECONNREFUSED');

    await expect(
      getAddresses({ apiEndpoint: API_ENDPOINT, apiToken: API_TOKEN })
    ).rejects.toThrow();
  });

  test('should reject when the response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/account/addresses')
      .reply(200, 'not-json');

    await expect(
      getAddresses({ apiEndpoint: API_ENDPOINT, apiToken: API_TOKEN })
    ).rejects.toThrow();
  });
});
