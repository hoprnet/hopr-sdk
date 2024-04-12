import nock from 'nock';
import { getToken } from './getToken';
import { APIError } from '../../utils';
import { GetTokenResponseType } from '../../types';

// Set up global constants for apiEndpoint and apiToken
const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('getToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return the token info if successful', async function () {
    const expectedResponse: GetTokenResponseType = {
      id: 'someTOKENid1223',
      description: 'this is an interesting token',
      valid_until: 100,
      capabilities: [
        {
          endpoint: 'tokensGetToken',
          limits: [
            {
              type: 'calls',
              conditions: {
                max: 100
              }
            }
          ]
        }
      ]
    };

    nock(API_ENDPOINT).get('/api/v3/token').reply(200, expectedResponse);

    expect(
      await getToken({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).toEqual(expectedResponse);
  });

  it('should return 401 if authentication failed', async function () {
    const mockResponse = {
      status: 401,
      statusText: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_ENDPOINT).get('/api/v3/token').reply(401, mockResponse);

    await expect(
      getToken({ apiEndpoint: API_ENDPOINT, apiToken: 'invalid token' })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization failed', async function () {
    const mockResponse = {
      status: 403,
      statusText: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_ENDPOINT).get('/api/v3/token').reply(403, mockResponse);

    await expect(
      getToken({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });

  it('should return 404 if resource not found', async function () {
    nock(API_ENDPOINT).get('/api/v3/token').reply(404);

    await expect(
      getToken({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
});
