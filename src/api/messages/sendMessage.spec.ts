import nock from 'nock';
import { APIError } from '../../utils';
import { sendMessage } from './sendMessage';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const TAG = 8;
const BODY = 'Hello';
const PEER_ID = '16Uiu2HAm2SF8EdwwUaaSoYTiZSddnG4hLVF7dizh32QFTNWMic2b';
const PATH = ['16Uiu2HAm1uV82HyD1iJ5DmwJr4LftmJUeMfj8zFypBRACmrJc16n'];
const HOPS = 3;

const PAYLOAD = {
  body: BODY,
  peerId: PEER_ID,
  path: PATH,
  hops: HOPS,
  tag: TAG
};

describe('sendMessage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

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
      status: 401,
      statusText: 'authentication failed',
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
    ).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization failed', async () => {
    const errorResponse = {
      status: 403,
      statusText: 'authorization failed',
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
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure occurred', async () => {
    const errorResponse = {
      status: 422,
      statusText: 'unknown failure',
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
    ).rejects.toThrow(APIError);
  });
});
