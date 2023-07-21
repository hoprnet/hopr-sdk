import nock from 'nock';
import { HoprSDK } from './sdk';

describe('test sdk class', function () {
  afterEach(function () {
    jest.clearAllMocks();
    nock.abortPendingRequests();
    nock.cleanAll();
  });

  it('should abort the request with custom timeout', async function () {
    const apiEndpoint = new URL('https://example.com');
    const apiToken = 'token';
    // request delay
    const delay = 20000;
    // has default timeout of 30s
    const sdk = new HoprSDK({ apiEndpoint: apiEndpoint.origin, apiToken });

    nock(apiEndpoint.origin)
      .post('/api/v2/messages')
      .delay(delay) // Delay the response to trigger a timeout
      .reply(200, 'Mock data');

    // delay > timeout so it should throw error
    await expect(
      sdk.api.messages.sendMessage({
        body: 'test',
        recipient: 'recipient',
        path: [],
        timeout: 500
      })
    ).rejects.toThrowError('TIMEOUT');
  });
  it('should abort the request if request takes longer than class timeout', async function () {
    const apiEndpoint = new URL('https://example.com');
    const apiToken = 'token';
    // request delay
    const delay = 20000;
    // class timeout 500s
    const sdk = new HoprSDK({
      apiEndpoint: apiEndpoint.origin,
      apiToken,
      timeout: 500
    });

    nock(apiEndpoint.origin)
      .post('/api/v2/messages')
      .delay(delay) // Delay the response to trigger a timeout
      .reply(200, 'Mock data');

    // delay > timeout so it should throw error
    await expect(
      sdk.api.messages.sendMessage({
        body: 'test',
        recipient: 'recipient',
        path: []
      })
    ).rejects.toThrowError('TIMEOUT');
  });
});
