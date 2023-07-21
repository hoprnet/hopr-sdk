import { fetchWithTimeout } from './fetchWithTimeout';
import http from 'http';

const PORT = 5555;
const API_ENDPOINT = new URL(`http://localhost:${PORT}`);

describe('fetchWithTimeout', () => {
  let httpServer: http.Server;

  afterEach((done) => {
    if (httpServer) httpServer.close(done);
  });

  it('should abort the request if it takes longer than the specified timeout', async function () {
    const apiEndpoint = new URL(API_ENDPOINT);
    const options = { method: 'GET' };
    const ms = 1000;

    httpServer = http.createServer((req, res) => {
      setTimeout(() => {
        res.end(JSON.stringify({ key: 'value' }));
      }, ms); // delay the response
    });

    httpServer.listen(PORT);

    await expect(
      fetchWithTimeout(apiEndpoint, options, ms)
    ).rejects.toThrowError('TIMEOUT');
  });

  it('should return the response when the request completes within the timeout', async function () {
    const mockResponse = { status: 200, data: 'Mock data' };

    const apiEndpoint = new URL(API_ENDPOINT);
    const options = { method: 'GET' };
    const ms = 1000;

    httpServer = http.createServer((req, res) => {
      res.end(JSON.stringify(mockResponse));
    });

    httpServer.listen(PORT);

    const response = await fetchWithTimeout(apiEndpoint, options, ms);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockResponse);
  });
});
