import nock from 'nock';
import { setAlias } from './setAlias';
import { APIError } from '../../utils';

const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';
const ALIAS = 'my-alias';
const PEER_ID = 'peer123';

describe('setAlias function', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('should return 201 and undefined if successful', async function () {
    nock(API_URL)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(201);

    const result = await setAlias({
      apiKey: API_KEY,
      url: API_URL,
      peerId: PEER_ID,
      alias: ALIAS
    });
    expect(result).toBe(true);
  });

  test('should return 400 if invalid peerId was provided', async function () {
    nock(API_URL)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(400, { status: 'INVALID_PEERID' });

    await expect(
      setAlias({
        apiKey: API_KEY,
        url: API_URL,
        peerId: PEER_ID,
        alias: ALIAS
      })
    ).rejects.toThrow(APIError);
  });

  test('should return 401 if authentication failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    const invalidApikey = 'my-invalid-api-key';
    nock(API_URL)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(401, expectedResponse);

    await expect(
      setAlias({
        apiKey: invalidApikey,
        url: API_URL,
        peerId: PEER_ID,
        alias: ALIAS
      })
    ).rejects.toThrow(APIError);
  });

  test('should return 403 if authorization failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(API_URL)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(403, expectedResponse);

    await expect(
      setAlias({
        apiKey: API_KEY,
        url: API_URL,
        peerId: PEER_ID,
        alias: ALIAS
      })
    ).rejects.toThrow(APIError);
  });

  test('should return 422 if unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };
    nock(API_URL)
      .post('/api/v2/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(422, expectedResponse);

    await expect(
      setAlias({
        apiKey: API_KEY,
        url: API_URL,
        peerId: PEER_ID,
        alias: ALIAS
      })
    ).rejects.toThrow(APIError);
  });
});
