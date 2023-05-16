import { createToken } from './createToken';
import { APIError } from '../../utils';
import type {
  CreateTokenPayloadType,
  CreateTokenResponseType
} from '../../types';
import nock from 'nock';

// Set up global constants for URL and API key
const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('create function', () => {
  const body: CreateTokenPayloadType = {
    url: API_URL,
    apiKey: API_KEY,
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

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates token successfully', async function () {
    const expectedResponse: CreateTokenResponseType = {
      token: 'my-test-token'
    };

    const expectedRequestBody = JSON.stringify(body);

    nock(API_URL)
      .post('/api/v2/tokens', expectedRequestBody)
      .reply(201, expectedResponse);

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
      apiKey: API_KEY,
      url: API_URL,
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

    const expectedRequestBody = JSON.stringify(invalidBody);

    nock(API_URL)
      .post('/api/v2/tokens', expectedRequestBody)
      .reply(400, mockResponse);

    await expect(createToken({ ...invalidBody })).rejects.toThrow(APIError);
  });

  test('throws APIError on 422', async function () {
    const expectedStatus = 'NOT_ENOUGH_BALANCE';
    const mockResponse = { status: expectedStatus };

    const expectedRequestBody = JSON.stringify(body);

    nock(API_URL)
      .post('/api/v2/tokens', expectedRequestBody)
      .reply(422, mockResponse);

    await expect(createToken({ ...body })).rejects.toThrow(APIError);
  });
});
