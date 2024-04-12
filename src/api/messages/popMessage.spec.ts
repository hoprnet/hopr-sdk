import nock from 'nock';
import { PopMessageResponseType } from '../../types';
import { APIError } from '../../utils';
import { popMessage } from './popMessage';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TAG = 8080;

describe('test popMessage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should pop message', async () => {
    nock(API_ENDPOINT)
      .post('/api/v3/messages/pop')
      .reply(200, {
        tag: 12,
        body: 'This is a HOPR message.',
        receivedAt: 1324284684614
      } as PopMessageResponseType);

    const response = await popMessage({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      tag: TAG
    });

    expect(response.tag).toBe(12);
  });

  it('should return 401 if authentication failed', async () => {
    const errorResponse = {
      status: 401,
      statusText: 'authentication failed',
      error: 'invalid api token'
    };

    nock(API_ENDPOINT).post('/api/v3/messages/pop').reply(401, errorResponse);

    await expect(
      popMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization failed', async () => {
    const errorResponse = {
      status: 403,
      statusText: 'authorization failed',
      error: 'permission denied'
    };
    nock(API_ENDPOINT).post('/api/v3/messages/pop').reply(403, errorResponse);

    await expect(
      popMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure occurred', async () => {
    const errorResponse = {
      status: 422,
      statusText: 'unknown failure',
      error: 'server error'
    };
    nock(API_ENDPOINT).post('/api/v3/messages/pop').reply(422, errorResponse);

    await expect(
      popMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });
});
