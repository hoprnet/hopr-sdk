import { fetchWithTimeout } from './fetchWithTimeout';
import http from 'http';

const PORT = 5555;
const API_ENDPOINT = new URL(`http://localhost:${PORT}`);

describe('fetchWithTimeout', () => {
  it('should abort the request if it takes longer than the specified timeout', async function () {
    const apiEndpoint = new URL(API_ENDPOINT);
    const options = { method: 'GET' };

    const httpServer = http.createServer();
    httpServer.listen(PORT);

    await expect(
      fetchWithTimeout(apiEndpoint, options, 1)
    ).rejects.toThrowError('TIMEOUT');

    return new Promise<void>((res) => {
      httpServer.close(() => res());
    });
  });

  it('should be able to send multiple requests at the same time', async function () {
    const mockResponse = { status: 200, data: 'Mock data' };

    const apiEndpoint = new URL(API_ENDPOINT);
    const options = { method: 'GET' };
    const requests = Array.from({ length: 5 });

    const httpServer = http.createServer((req, res) => {
      res.end(JSON.stringify(mockResponse));
    });

    httpServer.listen(PORT);

    const responses = [];

    for (const request of requests) {
      const temp = await fetchWithTimeout(apiEndpoint, options);
      responses.push(temp);
    }

    // get back 5 responses for 5 requests
    expect(responses.length).toEqual(requests.length);
    return new Promise<void>((res) => {
      httpServer.close(() => res());
    });
  }, 120_000);
});
