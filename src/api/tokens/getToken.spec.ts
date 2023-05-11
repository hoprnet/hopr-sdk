import nock from 'nock';
import { getToken } from './getToken';
import { APIError } from '../../utils';

// Set up global constants for URL and API key
const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('getToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return the token info if successful', async function () {
    const expectedResponse = {
      id: 'someTOKENid1223',
      description: 'this is an interesting token',
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

    nock(API_URL).get('/api/v2/token').reply(200, expectedResponse);

    expect(await getToken(API_URL, API_KEY)).toEqual(expectedResponse);
  });

  it('should return 401 if authentication failed', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_URL).get('/api/v2/token').reply(401, mockResponse);

    await expect(getToken(API_URL, 'invalid token')).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization failed', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_URL).get('/api/v2/token').reply(403, mockResponse);

    await expect(getToken(API_URL, API_KEY)).rejects.toThrow(APIError);
  });

  it('should return 404 if resource not found', async function () {
    nock(API_URL).get('/api/v2/token').reply(404);

    await expect(getToken(API_URL, API_KEY)).rejects.toThrow(APIError);
  });
});
