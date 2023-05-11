import nock from 'nock';
import { deleteToken } from './deleteToken';
import { APIError } from '../../utils';

// Set up global constants for URL and API key
const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('deleteToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns true when token is successfully deleted', async function () {
    nock(API_URL).post('/api/v2/tokens').reply(204);

    // Call the function and expect it to return true
    const result = await deleteToken(API_URL, API_KEY);
    expect(result).toBe(true);
  });

  it('should return 401 when authentication fails', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    nock(API_URL).post('/api/v2/tokens').reply(401, mockResponse);

    // Call the function and expect it to throw an APIError
    await expect(deleteToken(API_URL, API_KEY)).rejects.toThrow(APIError);
  });

  it('should return 403 when authorization fails', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(API_URL).post('/api/v2/tokens').reply(403, mockResponse);

    // Call the function and expect it to throw an APIError
    await expect(deleteToken(API_URL, API_KEY)).rejects.toThrow(APIError);
  });

  it('should throw APIError on internal server error', async function () {
    nock(API_URL).post('/api/v2/tokens').reply(500);

    // Call the function and expect it to throw an APIError
    await expect(deleteToken(API_URL, API_KEY)).rejects.toThrow(APIError);
  });
});
