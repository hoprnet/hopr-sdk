import nock from 'nock';
import { HoprSDK } from './sdk';

describe('test sdk class', function () {
  it('should be able to overwrite timeout', async function () {
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
});
