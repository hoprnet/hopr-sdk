import { fetchWithTimeout } from './fetchWithTimeout';
import nock from 'nock';

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  it('should abort the request if it takes longer than the specified timeout', async () => {
    const apiEndpoint = new URL('https://example.com');
    const options = { method: 'GET' };
    const ms = 1000;

    nock(apiEndpoint.origin)
      .get(apiEndpoint.pathname)
      .delay(ms + 100) // Delay the response to trigger a timeout
      .reply(200, 'Mock data');

    await expect(
      fetchWithTimeout(apiEndpoint, options, ms)
    ).rejects.toThrowError('TIMEOUT');
  });

  it('should return the response when the request completes within the timeout', async () => {
    const mockResponse = { status: 200, data: 'Mock data' };

    const apiEndpoint = new URL('https://example.com');
    const options = { method: 'POST' };
    const ms = 1000;

    nock(apiEndpoint.origin)
      .post(apiEndpoint.pathname)
      .reply(200, mockResponse);

    const response = await fetchWithTimeout(apiEndpoint, options, ms);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockResponse);
  });
});
