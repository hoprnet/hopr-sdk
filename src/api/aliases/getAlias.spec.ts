import { getAlias } from './getAlias';
import nock from 'nock';
import { APIError } from '../../utils';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const ALIAS = 'my-alias';

describe('getAlias', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return peerId when provided alias exists', async function () {
    const expectedPeerId = '0x1234567890123456789012345678901234567890';
    nock(BASE_PATH)
      .get(`/api/v2/aliases/${ALIAS}`)
      .reply(200, { peerId: expectedPeerId });

    const result = await getAlias(BASE_PATH, API_TOKEN, { alias: ALIAS });

    expect(result).toBe(expectedPeerId);
  });

  it('should return 401 when authentication fails', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    nock(BASE_PATH)
      .get(`/api/v2/aliases/${ALIAS}`)
      .reply(401, expectedResponse);

    await expect(
      getAlias(BASE_PATH, API_TOKEN, { alias: ALIAS })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 when authorization fails', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(BASE_PATH)
      .get(`/api/v2/aliases/${ALIAS}`)
      .reply(403, expectedResponse);

    await expect(
      getAlias(BASE_PATH, API_TOKEN, { alias: ALIAS })
    ).rejects.toThrow(APIError);
  });

  it('should return 404 when alias is not found', async function () {
    const expectedStatus = 'PEERID_NOT_FOUND';
    nock(BASE_PATH)
      .get(`/api/v2/aliases/${ALIAS}`)
      .reply(404, { status: expectedStatus });

    await expect(
      getAlias(BASE_PATH, API_TOKEN, { alias: ALIAS })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 when there is an unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };
    nock(BASE_PATH)
      .get(`/api/v2/aliases/${ALIAS}`)
      .reply(422, expectedResponse);

    await expect(
      getAlias(BASE_PATH, API_TOKEN, { alias: ALIAS })
    ).rejects.toThrow(APIError);
  });
});
