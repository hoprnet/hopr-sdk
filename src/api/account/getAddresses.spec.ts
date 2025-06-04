import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { getAddresses } from './getAddresses';
import nock from 'nock';
import { GetAddressesResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('getAddresses', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return the HOPR and native addresses if 200', async function () {
    const expectedResponse: GetAddressesResponseType = {
      hopr: 'peer123',
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
      native: '0x123abc'
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
});
