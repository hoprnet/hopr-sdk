import { sdkApiError } from '../../utils';
import { removeAlias } from './removeAlias';
import nock from 'nock';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const ALIAS = 'my-alias';

describe('removeAlias', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return 204 if alias is removed successfully', async function () {
    const API_TOKEN = 'my-api-key';

    nock(API_ENDPOINT).delete(`/api/v3/aliases/${ALIAS}`).reply(204);

    const response = await removeAlias({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      alias: ALIAS
    });
    expect(response).toBe(true);
  });

  test('should return 401 if authentication failed', async function () {
    const invalidApiToken = 'my-invalid-api-token';
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v3/aliases/${ALIAS}`)
      .reply(401, expectedResponse);

    await expect(
      removeAlias({
        alias: ALIAS,
        apiToken: invalidApiToken,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 403 if authorization failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v3/aliases/${ALIAS}`)
      .reply(403, expectedResponse);
    await expect(
      removeAlias({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        alias: ALIAS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 422 if unknown failure occurred', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_ENDPOINT)
      .delete(`/api/v3/aliases/${ALIAS}`)
      .reply(422, expectedResponse);

    await expect(
      removeAlias({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        alias: ALIAS
      })
    ).rejects.toThrow(sdkApiError);
  });
});
