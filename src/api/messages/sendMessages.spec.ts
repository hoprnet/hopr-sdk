import { APIError } from '../../utils';
import { sendMessage } from './sendMessage';
import nock from 'nock';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const BODY = 'Hello';
const RECIPIENT = '16Uiu2HAm2SF8EdwwUaaSoYTiZSddnG4hLVF7dizh32QFTNWMic2b';
const PATH = ['16Uiu2HAm1uV82HyD1iJ5DmwJr4LftmJUeMfj8zFypBRACmrJc16n'];
const HOPS = 3;

const PAYLOAD = { body: BODY, recipient: RECIPIENT, path: PATH, hops: HOPS };

describe('sendMessage', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should send a message successfully with path', async () => {
    nock(API_ENDPOINT)
      .post('/api/v2/messages', {
        body: BODY,
        recipient: RECIPIENT,
        path: PATH
      })
      .reply(202, 'challenge-token');

    const response = await sendMessage({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      body: BODY,
      recipient: RECIPIENT,
      path: PATH
    });
    expect(response).toBe('challenge-token');
  });

  it('should send a message successfully with hops', async () => {
    nock(API_ENDPOINT)
      .post('/api/v2/messages', {
        body: BODY,
        recipient: RECIPIENT,
        hops: HOPS
      })
      .reply(202, 'challenge-token');

    const response = await sendMessage({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      body: BODY,
      recipient: RECIPIENT,
      hops: HOPS
    });
    expect(response).toBe('challenge-token');
  });

  it('should throw an error if no PATH or hops provided', async () => {
    await expect(
      sendMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        body: BODY,
        recipient: RECIPIENT
      })
    ).rejects.toThrow('No path or number of hops provided.');
  });

  it('should return 401 if authentication failed', async () => {
    const errorResponse = {
      status: 'authentication failed',
      error: 'invalid api token'
    };
    nock(API_ENDPOINT)
      .post('/api/v2/messages', PAYLOAD)
      .reply(401, errorResponse);

    await expect(
      sendMessage({
        apiToken: 'api-token',
        apiEndpoint: API_ENDPOINT,
        body: BODY,
        recipient: RECIPIENT,
        path: PATH,
        hops: HOPS
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization failed', async () => {
    const errorResponse = {
      status: 'authorization failed',
      error: 'permission denied'
    };
    nock(API_ENDPOINT)
      .post('/api/v2/messages', PAYLOAD)
      .reply(403, errorResponse);

    await expect(
      sendMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        body: BODY,
        recipient: RECIPIENT,
        path: PATH,
        hops: HOPS
      })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure occurred', async () => {
    const errorResponse = { status: 'unknown failure', error: 'server error' };
    nock(API_ENDPOINT)
      .post('/api/v2/messages', PAYLOAD)
      .reply(422, errorResponse);

    await expect(
      sendMessage({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        body: BODY,
        recipient: RECIPIENT,
        path: PATH,
        hops: HOPS
      })
    ).rejects.toThrow(APIError);
  });
});
