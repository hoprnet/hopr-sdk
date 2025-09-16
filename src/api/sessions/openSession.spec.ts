import nock from 'nock';
import { openSession } from './openSession';
import { sdkApiError } from '../../utils';
import {
  RemoveBasicAuthenticationPayloadType,
  OpenSessionResponseType,
  OpenSessionPayloadCallType
} from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const API_TOKEN_INVALID = 'my-invalid-api-token';
const BUDDY_NODE_ADDRESS = '0x3262f13a39efaca789ae58390441c9ed76bc658a';
const PROTOCOL = 'udp';

const body: RemoveBasicAuthenticationPayloadType<OpenSessionPayloadCallType> = {
  destination: BUDDY_NODE_ADDRESS,
  capabilities: ['Retransmission', 'Segmentation'],
  listenHost: '127.0.0.1:5542',
  forwardPath: {
    Hops: 1
  },
  returnPath: {
    Hops: 1
  },
  target: {
    Plain: 'example.com:8080'
  },
  responseBuffer: '2 MB'
};

describe('openSession function', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test('open using hops - should return 200 if successful', async function () {
    const resp: OpenSessionResponseType = {
      activeClients: [],
      destination: BUDDY_NODE_ADDRESS,
      forwardPath: {
        Hops: 1
      },
      hoprMtu: 1500,
      ip: '127.0.0.1',
      maxClientSessions: 2,
      maxSurbUpstream: '2000 kb/s',
      port: 5542,
      protocol: 'tcp',
      returnPath: {
        Hops: 1
      },
      surbLen: 398,
      target: 'example.com:8080'
    };
    nock(API_ENDPOINT)
      .post(`/api/v4/session/${PROTOCOL}`, body)
      .reply(200, resp);

    const result = await openSession({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      protocol: PROTOCOL,
      ...body
    });
    expect(result).toEqual(resp);
  });
  test('open using IntermediatePath - should return 200 if successful', async function () {
    const resp: OpenSessionResponseType = {
      target: "127.0.0.1:8081",
      destination: "0xbdb61dd58780f9118661dda6568a8bc57128bd10",
      forwardPath: {
          IntermediatePath: [
              "0xe56b036600d23af206f9ba358432f01780934039"
          ]
      },
      returnPath: {
          Hops: 0
      },
      protocol: "tcp",
      ip: "127.0.0.1",
      port: 10001,
      hoprMtu: 1002,
      surbLen: 395,
      activeClients: [],
      maxClientSessions: 5,
      maxSurbUpstream: null,
      responseBuffer: "2.0 MiB",
      sessionPool: null
    };
    nock(API_ENDPOINT)
      .post(`/api/v4/session/${PROTOCOL}`, body)
      .reply(200, resp);

    const result = await openSession({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      protocol: PROTOCOL,
      ...body
    });
    expect(result).toEqual(resp);
  });

  test('should return 400 if invalid node address was provided', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v4/session/${PROTOCOL}`, body)
      .reply(400, { status: 'INVALID_ERROR' });

    await expect(
      openSession({
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
      .post(`/api/v4/session/${PROTOCOL}`, body)
      .reply(401, expectedResponse);

    await expect(
      openSession({
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
      .post(`/api/v4/session/${PROTOCOL}`, body)
      .reply(403, expectedResponse);

    await expect(
      openSession({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });

  test('should return 409 if listening address and port already in use.', async function () {
    const expectedResponse = {
      status: 'INVALID_INPUT',
      error: 'Listening address and port already in use.'
    };
    nock(API_ENDPOINT)
      .post(`/api/v4/session/${PROTOCOL}`, body)
      .reply(409, expectedResponse);

    await expect(
      openSession({
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
      .post(`/api/v4/session/${PROTOCOL}`, body)
      .reply(422, expectedResponse);

    await expect(
      openSession({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        protocol: PROTOCOL,
        ...body
      })
    ).rejects.toThrow(sdkApiError);
  });
});
