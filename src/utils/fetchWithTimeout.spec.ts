import { fetchWithTimeout } from './fetchWithTimeout';
import nock from 'nock';

describe('fetchWithTimeout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  it('should abort the request if it takes longer than the specified timeout', async () => {
    const url = new URL('https://example.com');
    const options = { method: 'GET' };
    const ms = 1000;

    nock(url.origin)
      .get(url.pathname)
      .delay(ms + 100) // Delay the response to trigger a timeout
      .reply(200, 'Mock data');

    await expect(fetchWithTimeout(url, options, ms)).rejects.toThrowError(
      'TIMEOUT'
    );
  });

  it('should return the response when the request completes within the timeout', async () => {
    const mockResponse = { status: 200, data: 'Mock data' };

    const url = new URL('https://example.com');
    const options = { method: 'POST' };
    const ms = 1000;

    nock(url.origin).post(url.pathname).reply(200, mockResponse);

    const response = await fetchWithTimeout(url, options, ms);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockResponse);
  });
});
