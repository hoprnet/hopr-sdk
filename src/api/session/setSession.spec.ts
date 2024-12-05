import nock from 'nock';
import { setAlias } from './setAlias';
import { sdkApiError } from '../../utils';
import { SetAliasPayloadType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const ALIAS = 'my-alias';
const PEER_ID = 'peer123';

describe('setAlias function', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  /* Transition period between 2.1 and 2.2 */
  test('should return 201 and undefined if successful using peerId', async function () {
    nock(API_ENDPOINT)
      .post('/api/v3/aliases', {
        peerId: PEER_ID,
        alias: ALIAS
      })
      .reply(201);

    const result = await setAlias({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      peerId: PEER_ID,
      alias: ALIAS
    });
    expect(result).toBe(true);
  });
  /* ------------------------------------ */
  test('should return 201 and undefined if successful', async function () {
    nock(API_ENDPOINT)
      .post('/api/v3/aliases', {
        destination: PEER_ID,
        alias: ALIAS
      })
      .reply(201);

    const result = await setAlias({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      destination: PEER_ID,
      alias: ALIAS
    });
    expect(result).toBe(true);
  });

  test('should return 400 if invalid peerId was provided', async function () {
    nock(API_ENDPOINT)
      .post('/api/v3/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(400, { status: 'INVALID_PEERID' });

    await expect(
      setAlias({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: PEER_ID,
        alias: ALIAS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 401 if authentication failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    const invalidApiToken = 'my-invalid-api-token';
    nock(API_ENDPOINT)
      .post('/api/v3/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(401, expectedResponse);

    await expect(
      setAlias({
        apiToken: invalidApiToken,
        apiEndpoint: API_ENDPOINT,
        peerId: PEER_ID,
        alias: ALIAS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 403 if authorization failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(403, expectedResponse);

    await expect(
      setAlias({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: PEER_ID,
        alias: ALIAS
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 422 if unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/aliases', { peerId: PEER_ID, alias: ALIAS })
      .reply(422, expectedResponse);

    await expect(
      setAlias({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: PEER_ID,
        alias: ALIAS
      })
    ).rejects.toThrow(sdkApiError);
  });
});
