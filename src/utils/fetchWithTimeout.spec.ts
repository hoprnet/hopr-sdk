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
    const ms = 200;

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
    const ms = 200;

    httpServer = http.createServer((req, res) => {
      setTimeout(() => {
        res.end(JSON.stringify(mockResponse));
      }, ms); // delay the response
    });

    httpServer.listen(PORT);

    const response = await fetchWithTimeout(apiEndpoint, options, ms * 2);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(mockResponse);
  });

  it('should be able to send multiple requests at the same time', async function () {
    const mockResponse = { status: 200, data: 'Mock data' };

    const apiEndpoint = new URL(API_ENDPOINT);
    const options = { method: 'GET' };
    const ms = 200;
    const requests = Array.from({ length: 5 });

    httpServer = http.createServer((req, res) => {
      setTimeout(() => {
        res.end(JSON.stringify(mockResponse));
      }, ms); // delay the response
    });

    httpServer.listen(PORT);

    const responses = [];

    for (const request of requests) {
      const temp = await fetchWithTimeout(apiEndpoint, options, ms * 2);
      responses.push(temp);
    }

    // get back 5 responses for 5 requests
    expect(responses.length).toEqual(requests.length);
  });

  it('should throw error if one requests fails while trying to send multiple requests at the same time', async function () {
    const mockResponse = { status: 200, data: 'Mock data' };

    const apiEndpoint = new URL(API_ENDPOINT);
    const options = { method: 'GET' };
    const ms = 200;
    const requests = Array.from({ length: 5 }).map((value, index) => index);

    httpServer = http.createServer((req, res) => {
      setTimeout(() => {
        res.end(JSON.stringify(mockResponse));
      }, ms); // delay the response
    });

    httpServer.listen(PORT);

    const responses = [];
    const errors = [];
    for (const request of requests) {
      try {
        // make one request fail by decreasing ms
        const temp = await fetchWithTimeout(
          apiEndpoint,
          options,
          request !== 3 ? ms * 2 : ms / 2
        );
        responses.push(temp);
      } catch (e) {
        errors.push(e);
      }
    }

    // get back 4 responses for 5 requests
    expect(responses.length).toEqual(requests.length - 1);

    // expect to have failed once
    expect(errors.length).toEqual(1);
    expect(errors.at(0)).toEqual(new Error('TIMEOUT'));
  });
});
