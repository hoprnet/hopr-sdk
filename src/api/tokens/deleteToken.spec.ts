import nock from 'nock';
import { deleteToken } from './deleteToken';
import { APIError } from '../../utils';

// Set up global constants for API endpoint and API token
const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TOKEN_ID = 'someTOKENid1234';

describe('deleteToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns true when token is successfully deleted', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tokens/${TOKEN_ID}`).reply(204);

    // Call the function and expect it to return true
    const result = await deleteToken({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      id: TOKEN_ID
    });
    expect(result).toBe(true);
  });

  it('should return 401 when authentication fails', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    nock(API_ENDPOINT)
      .delete(`/api/v3/tokens/${TOKEN_ID}`)
      .reply(401, mockResponse);

    // Call the function and expect it to throw an APIError
    await expect(
      deleteToken({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        id: TOKEN_ID
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 when authorization fails', async function () {
    const mockResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(API_ENDPOINT)
      .delete(`/api/v3/tokens/${TOKEN_ID}`)
      .reply(403, mockResponse);

    // Call the function and expect it to throw an APIError
    await expect(
      deleteToken({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        id: TOKEN_ID
      })
    ).rejects.toThrow(APIError);
  });

  it('should throw APIError on internal server error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tokens/${TOKEN_ID}`).reply(500);

    // Call the function and expect it to throw an APIError
    await expect(
      deleteToken({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        id: TOKEN_ID
      })
    ).rejects.toThrow(Error);
  });
});
