import nock from 'nock';
import {
  PopAllMessagesResponseType,
  PopMessageResponseType
} from '../../types';
import { APIError } from '../../utils';
import { popAllMessages } from './popAllMessages';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TAG = 8080;

describe('test popAllMessages', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should pop all messages', async () => {
    nock(API_ENDPOINT)
      .post('/api/v3/messages/pop-all')
      .reply(200, {
        messages: [
          {
            tag: 12,
            body: 'This is a HOPR message.',
            receivedAt: 0
          }
        ]
      } as PopAllMessagesResponseType);

    const response = await popAllMessages({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      tag: TAG
    });

    expect(response.messages.at(0)?.tag).toBe(12);
  });

  it('should pop all messages with tag', async () => {
    nock(API_ENDPOINT)
      .post('/api/v3/messages/pop-all')
      .reply(200, {
        messages: [
          {
            tag: 12,
            body: 'This is a HOPR message.',
            receivedAt: 0
          }
        ]
      } as PopAllMessagesResponseType);

    const response = await popAllMessages({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      tag: 12
    });

    expect(response.messages.at(0)?.tag).toBe(12);
  });

  it('should return 401 if authentication failed', async () => {
    const errorResponse = {
      status: 'authentication failed',
      error: 'invalid api token'
    };

    nock(API_ENDPOINT)
      .post('/api/v3/messages/pop-all')
      .reply(401, errorResponse);

    await expect(
      popAllMessages({
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
    nock(API_ENDPOINT)
      .post('/api/v3/messages/pop-all')
      .reply(403, errorResponse);

    await expect(
      popAllMessages({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure occurred', async () => {
    const errorResponse = { status: 'unknown failure', error: 'server error' };
    nock(API_ENDPOINT)
      .post('/api/v3/messages/pop-all')
      .reply(422, errorResponse);

    await expect(
      popAllMessages({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });
});
