import { createToken } from './createToken';
import { APIError } from '../../utils';
import type {
  CreateTokenPayloadType,
  CreateTokenResponseType
} from '../../types';
import nock from 'nock';

// Set up global constants for apiEndpoint and apiToken
const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const body: CreateTokenPayloadType = {
  apiEndpoint: API_ENDPOINT,
  apiToken: API_TOKEN,
  description: 'my test token',
  lifetime: 360,
  capabilities: [
    {
      endpoint: 'tokensGetToken',
      limits: [
        {
          type: 'calls',
          conditions: {
            max: 100
          }
        }
      ]
    }
  ]
};

describe('createToken function', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates token successfully', async function () {
    const expectedResponse: CreateTokenResponseType = {
      token: 'my-test-token'
    };

    nock(API_ENDPOINT).post('/api/v3/tokens').reply(201, expectedResponse);

    const response = await createToken({ ...body });
    expect(response).toEqual(expectedResponse);
  });
  //   "INVALID_TOKEN_LIFETIME | INVALID_TOKEN_CAPABILITIES"

  test('throws APIError on 400', async function () {
    const expectedStatus =
      'INVALID_TOKEN_LIFETIME | INVALID_TOKEN_CAPABILITIES';
    const mockResponse = { status: expectedStatus };
    const invalidBody: CreateTokenPayloadType = {
      description: 'my test token',
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      lifetime: -500,
      capabilities: [
        {
          endpoint: 'tokensGetToken',
          limits: [
            {
              type: 'calls',
              conditions: {
                max: 100
              }
            }
          ]
        }
      ]
    };

    nock(API_ENDPOINT).post('/api/v3/tokens').reply(400, mockResponse);

    await expect(createToken({ ...invalidBody })).rejects.toThrow(APIError);
  });

  test('throws APIError on 422', async function () {
    const expectedStatus = 'NOT_ENOUGH_BALANCE';
    const mockResponse = { status: expectedStatus };

    nock(API_ENDPOINT).post('/api/v3/tokens').reply(422, mockResponse);

    await expect(createToken({ ...body })).rejects.toThrow(APIError);
  });
});
