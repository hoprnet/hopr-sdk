import { APIError } from '../../utils';
import { removeAlias } from './removeAlias';
import nock from 'nock';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const ALIAS = 'my-alias';

describe('removeAlias', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return 204 if alias is removed successfully', async function () {
    const API_TOKEN = 'my-api-key';

    nock(BASE_PATH).delete(`/api/v2/aliases/${ALIAS}`).reply(204);

    const response = await removeAlias(BASE_PATH, API_TOKEN, { alias: ALIAS });
    expect(response).toBe(true);
  });

  test('should return 401 if authentication failed', async function () {
    const invalidApikey = 'my-invalid-api-key';
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(BASE_PATH)
      .delete(`/api/v2/aliases/${ALIAS}`)
      .reply(401, expectedResponse);

    await expect(
      removeAlias(BASE_PATH, invalidApikey, { alias: ALIAS })
    ).rejects.toThrow(APIError);
  });

  test('should return 403 if authorization failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(BASE_PATH)
      .delete(`/api/v2/aliases/${ALIAS}`)
      .reply(403, expectedResponse);
    await expect(
      removeAlias(BASE_PATH, API_TOKEN, { alias: ALIAS })
    ).rejects.toThrow(APIError);
  });

  test('should return 422 if unknown failure occurred', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(BASE_PATH)
      .delete(`/api/v2/aliases/${ALIAS}`)
      .reply(422, expectedResponse);

    await expect(
      removeAlias(BASE_PATH, API_TOKEN, { alias: ALIAS })
    ).rejects.toThrow(APIError);
  });
});
