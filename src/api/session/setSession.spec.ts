import nock from 'nock';
import { setSession } from './setSession';
import { sdkApiError } from '../../utils';
import { RemoveBasicAuthenticationPayloadType, SetSessionResponseType, SetSessionPayloadCallType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const API_TOKEN_INVALID = 'my-invalid-api-token';
const PEER_ID = 'peer123';
const PROTOCOL = 'udp';

const body:  RemoveBasicAuthenticationPayloadType<SetSessionPayloadCallType> = {
  destination: PEER_ID,
  capabilities: [
    "Retransmission",
    "Segmentation"
  ],
  listenHost: "127.0.0.1:10000",
  path: {
    Hops: 1
  },
  target: {
    Plain: "example.com:8080"
  }
};


describe('setSession function', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test('should return 200 if successful', async function () {
    const resp = {
      ip: "127.0.0.1",
      port: 5542,
      protocol: "tcp",
      target: "example.com:80"
    }
    nock(API_ENDPOINT)
      .post(`/api/v3/session/${PROTOCOL}`, body)
      .reply(200, resp);

    const result = await setSession({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      protocol: PROTOCOL,
      ...body
    });
    expect(result).toEqual(resp);
  });

  test('should return 400 if invalid peerId was provided', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/session/${PROTOCOL}`, body)
      .reply(400, { status: 'INVALID_PEERID' });

    await expect(
      setSession({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 401 if authentication failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };
    nock(API_ENDPOINT)
      .post(`/api/v3/session/${PROTOCOL}`, body)
      .reply(401, expectedResponse);

    await expect(
      setSession({
        apiToken: API_TOKEN_INVALID,
        apiEndpoint: API_ENDPOINT,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 403 if authorization failed', async function () {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(API_ENDPOINT)
      .post(`/api/v3/session/${PROTOCOL}`, body)
      .reply(403, expectedResponse);

    await expect(
      setSession({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 422 if unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };
    nock(API_ENDPOINT)
      .post(`/api/v3/session/${PROTOCOL}`, body)
      .reply(422, expectedResponse);

    await expect(
      setSession({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });
});
