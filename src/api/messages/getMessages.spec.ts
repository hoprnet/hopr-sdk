import nock from 'nock';
import { GetMessagesResponseType } from '../../types';
import { APIError } from '../../utils';
import { getMessages } from './getMessages';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BODY = 'Hello';

describe('test getMessages', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get messages', async () => {
    nock(API_ENDPOINT)
      .get('/api/v3/messages')
      .reply(200, {
        messages: [
          {
            body: BODY,
            tag: 1,
            receivedAt: Date.now()
          }
        ]
      } as GetMessagesResponseType);

    const response = await getMessages({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.messages.at(0)?.body).toBe(BODY);
  });

  it('should get messages with tag', async () => {
    nock(API_ENDPOINT)
      .get('/api/v3/messages?tag=1')
      .reply(200, {
        messages: [
          {
            body: BODY,
            tag: 1,
            receivedAt: Date.now()
          }
        ]
      } as GetMessagesResponseType);

    const response = await getMessages({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      tag: 1
    });

    expect(response.messages.at(0)?.body).toBe(BODY);
  });

  it('should return 401 if authentication failed', async () => {
    const errorResponse = {
      status: 'authentication failed',
      error: 'invalid api token'
    };

    nock(API_ENDPOINT).get('/api/v3/messages').reply(401, errorResponse);

    await expect(
      getMessages({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization failed', async () => {
    const errorResponse = {
      status: 'authorization failed',
      error: 'permission denied'
    };
    nock(API_ENDPOINT).get('/api/v3/messages').reply(403, errorResponse);

    await expect(
      getMessages({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure occurred', async () => {
    const errorResponse = { status: 'unknown failure', error: 'server error' };
    nock(API_ENDPOINT).get('/api/v3/messages').reply(422, errorResponse);

    await expect(
      getMessages({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });
});
