import nock from 'nock';
import { setAlias } from './setAlias';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const ALIAS = 'my-alias';
const PEER_ID = 'peer123';

describe('setAlias function', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return 201 and undefined if successful', async function () {
    nock(BASE_PATH)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(201);

    const result = await setAlias(BASE_PATH, API_TOKEN, PEER_ID, ALIAS);
    expect(result).toBeUndefined();
  });

  test('should return 400 if invalid peerId was provided', async function () {
    nock(BASE_PATH)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(400, { status: 'INVALID_PEERID' });

    const result = await setAlias(BASE_PATH, API_TOKEN, PEER_ID, ALIAS);
    expect(result).toEqual({ status: 'INVALID_PEERID' });
  });

  test('should return 401 if authentication failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    const invalidApikey = 'my-invalid-api-key';
    nock(BASE_PATH)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(401, expectedResponse);

    const result = await setAlias(BASE_PATH, invalidApikey, PEER_ID, ALIAS);
    expect(result).toEqual(expectedResponse);
  });

  test('should return 403 if authorization failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(BASE_PATH)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(403, expectedResponse);

    const result = await setAlias(BASE_PATH, API_TOKEN, PEER_ID, ALIAS);
    expect(result).toEqual(expectedResponse);
  });

  test('should return 422 if unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };
    nock(BASE_PATH)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(422, expectedResponse);

    const result = await setAlias(BASE_PATH, API_TOKEN, PEER_ID, ALIAS);
    expect(result).toEqual(expectedResponse);
  });
});
