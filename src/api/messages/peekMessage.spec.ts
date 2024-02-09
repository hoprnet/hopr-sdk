import nock from 'nock';
import { PeekMessageResponseType } from '../../types';
import { APIError } from '../../utils';
import { peekMessage } from './peekMessage';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TAG = 8080;

describe('test peekMessage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should peek message', async () => {
    nock(API_ENDPOINT)
      .post('/api/v3/messages/peek')
      .reply(200, {
        tag: 12,
        body: 'This is a HOPR message.',
        receivedAt: 1324284684614
      } as PeekMessageResponseType);

    const response = await peekMessage({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      tag: TAG
    });

    expect(response.tag).toBe(12);
  });

  it('should return 401 if authentication failed', async () => {
    const errorResponse = {
      status: 'authentication failed',
      error: 'invalid api token'
    };

    nock(API_ENDPOINT).post('/api/v3/messages/peek').reply(401, errorResponse);

    await expect(
      peekMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization failed', async () => {
    const errorResponse = {
      status: 'authorization failed',
      error: 'permission denied'
    };
    nock(API_ENDPOINT).post('/api/v3/messages/peek').reply(403, errorResponse);

    await expect(
      peekMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure occurred', async () => {
    const errorResponse = { status: 'unknown failure', error: 'server error' };
    nock(API_ENDPOINT).post('/api/v3/messages/peek').reply(422, errorResponse);

    await expect(
      peekMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });
});
