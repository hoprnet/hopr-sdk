import { HoprSDK as SDK } from '../src/sdk';
import { GetTokenResponseType, api } from '../src';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

describe('Tokens E2E Tests', function () {
  let newToken: string;
  // Should create a token before anything else
  beforeAll(async () => {
    const newTokenResponse = await sdk.api.tokens.createToken({
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
    });

    expect(newTokenResponse).toStrictEqual({
      token: expect.any(String)
    });

    newToken = newTokenResponse!.token;
  });

  test('should get the full token information', async function () {
    const tokenInfo = await api.getToken({
      apiEndpoint: HOPRD_API_ENDPOINT_1!,
      apiToken: newToken
    });

    const expectedResponse: GetTokenResponseType = {
      description: expect.any(String),
      id: expect.any(String),
      capabilities: [
        {
          endpoint: expect.any(String),
          limits: [
            {
              type: expect.any(String),
              conditions: {
                max: expect.any(Number)
              }
            }
          ]
        }
      ]
    };

    expect(tokenInfo).toStrictEqual(expectedResponse);
  });

  afterAll(async () => {
    const deleteTokenResponse = await sdk.api.tokens.deleteToken({
      id: newToken
    });

    expect(deleteTokenResponse).toBe(true);
  });
});
