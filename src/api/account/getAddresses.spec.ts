import { APIError } from '../../utils';
import { getAddresses } from './getAddresses';
import nock from 'nock';

const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('getAddresses', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return the HOPR and native addresses if 200', async function () {
    const expectedResponse = {
      hopr: 'peer123',
      native: '0x123abc'
    };

    nock(API_URL).get('/api/v2/account/addresses').reply(200, expectedResponse);

    const result = await getAddresses(API_URL, API_KEY);
    expect(result).toEqual(expectedResponse);
  });

  test('should return 401 if authentication failed', async function () {
    const invalidApiKey = 'Not valid';
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_URL).get('/api/v2/account/addresses').reply(401, expectedResponse);

    await expect(getAddresses(API_URL, invalidApiKey)).rejects.toThrow(
      APIError
    );
  });

  test('should return 403 if authorization fails', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_URL).get('/api/v2/account/addresses').reply(403, expectedResponse);

    await expect(getAddresses(API_URL, API_KEY)).rejects.toThrow(APIError);
  });

  test('should return 422 if there is an unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_URL).get('/api/v2/account/addresses').reply(422, expectedResponse);

    await expect(getAddresses(API_URL, API_KEY)).rejects.toThrow(APIError);
  });
});