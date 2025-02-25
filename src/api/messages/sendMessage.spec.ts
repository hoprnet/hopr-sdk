import nock from 'nock';
import { sdkApiError } from '../../utils';
import { sendMessage } from './sendMessage';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TAG = 4677;
const BODY = 'Hello';
const PEER_ID = '16Uiu2HAm2SF8EdwwUaaSoYTiZSddnG4hLVF7dizh32QFTNWMic2b';
const PATH = ['16Uiu2HAm1uV82HyD1iJ5DmwJr4LftmJUeMfj8zFypBRACmrJc16n'];
const HOPS = 3;

const PAYLOAD = {
  body: BODY,
  destination: PEER_ID,
  path: PATH,
  hops: HOPS,
  tag: TAG
};

describe('sendMessage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  /* Transition period between 2.1 and 2.2 */
  it('should send a message successfully using peerId', async () => {
    nock(API_ENDPOINT)
      .post('/api/v3/messages', {
        body: BODY,
        peerId: PEER_ID,
        hops: HOPS,
        tag: TAG
      })
      .reply(202, 'challenge-token');

    const response = await sendMessage({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      body: BODY,
      peerId: PEER_ID,
      hops: HOPS,
      tag: TAG
    });
    expect(response).toBe('challenge-token');
  });
  /* ------------------------------------ */

  it('should send a message successfully with path', async () => {
    nock(API_ENDPOINT)
      .post('/api/v3/messages', PAYLOAD)
      .reply(202, 'challenge-token');

    const response = await sendMessage({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      ...PAYLOAD
    });
    expect(response).toBe('challenge-token');
  });

  it('should send a message successfully with hops', async () => {
    nock(API_ENDPOINT)
      .post('/api/v3/messages', PAYLOAD)
      .reply(202, 'challenge-token');

    const response = await sendMessage({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      ...PAYLOAD
    });
    expect(response).toBe('challenge-token');
  });

  it('should return 401 if authentication failed', async () => {
    const errorResponse = {
      status: 'authentication failed',
      error: 'invalid api token'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/messages', PAYLOAD)
      .reply(401, errorResponse);

    await expect(
      sendMessage({
        apiToken: 'api-token',
        apiEndpoint: API_ENDPOINT,
        ...PAYLOAD
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should return 403 if authorization failed', async () => {
    const errorResponse = {
      status: 'authorization failed',
      error: 'permission denied'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/messages', PAYLOAD)
      .reply(403, errorResponse);

    await expect(
      sendMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        ...PAYLOAD
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should return 412 if the node is not ready', async () => {
    const errorResponse = {
      status: 'The node is not ready',
      error: 'The node is not ready'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/messages', PAYLOAD)
      .reply(412, errorResponse);

    await expect(
      sendMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        ...PAYLOAD
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should return 422 if unknown failure occurred', async () => {
    const errorResponse = {
      status: 'unknown failure',
      error: 'server error'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/messages', PAYLOAD)
      .reply(422, errorResponse);

    await expect(
      sendMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        ...PAYLOAD
      })
    ).rejects.toThrow(sdkApiError);
  });
});
