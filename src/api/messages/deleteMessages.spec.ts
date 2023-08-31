import nock from 'nock';
import { APIError } from '../../utils';
import { deleteMessages } from './deleteMessages';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TAG = 8080;

describe('test deleteMessages', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should delete messages with tag', async () => {
    nock(API_ENDPOINT).delete(`/api/v3/messages?tag=${TAG}`).reply(204);

    const response = await deleteMessages({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      tag: TAG
    });

    expect(response).toBe(true);
  });

  it('should return 401 if authentication failed', async () => {
    const errorResponse = {
      status: 'authentication failed',
      error: 'invalid api token'
    };
    nock(API_ENDPOINT)
      .delete(`/api/v3/messages?tag=${TAG}`)
      .reply(401, errorResponse);

    await expect(
      deleteMessages({
        apiToken: 'api-token',
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
      .delete(`/api/v3/messages?tag=${TAG}`)
      .reply(403, errorResponse);

    await expect(
      deleteMessages({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure occurred', async () => {
    const errorResponse = { status: 'unknown failure', error: 'server error' };
    nock(API_ENDPOINT)
      .delete(`/api/v3/messages?tag=${TAG}`)
      .reply(422, errorResponse);

    await expect(
      deleteMessages({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        tag: TAG
      })
    ).rejects.toThrow(APIError);
  });
});
