import nock from 'nock';
import { GetMessagesSizeResponseType } from '../../types';
import { APIError } from '../../utils';
import { getMessagesSize } from './getMessagesSize';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TAG = 8080;

describe('test getMessagesSize', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should get messages with tag', async () => {
    nock(API_ENDPOINT)
      .get(`/api/v3/messages/size?tag=${TAG}`)
      .reply(202, {
        size: 1011
      } as GetMessagesSizeResponseType);

    const response = await getMessagesSize({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      tag: TAG
    });

    expect(response.size).toBe(1011);
  });

  it('should return 401 if authentication failed', async () => {
    const errorResponse = {
      status: 401,
      statusText: 'authentication failed',
      error: 'invalid api token'
    };

    nock(API_ENDPOINT)
      .get(`/api/v3/messages/size?tag=${TAG}`)
      .reply(401, errorResponse);

    await expect(
      getMessagesSize({
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
    nock(API_ENDPOINT)
      .get(`/api/v3/messages/size?tag=${TAG}`)
      .reply(403, errorResponse);

    await expect(
      getMessagesSize({
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
    nock(API_ENDPOINT)
      .get(`/api/v3/messages/size?tag=${TAG}`)
      .reply(422, errorResponse);

    await expect(
      getMessagesSize({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });
});
