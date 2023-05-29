import { HoprSdk as SDK } from '../sdk';
import { api } from '..';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({ url: HOPRD_API_ENDPOINT_1!, apiToken: HOPRD_API_TOKEN! });
const { tokens } = sdk.api;

describe('Tokens E2E Tests', function () {
  let newToken: string;
  // Should create a token before anything else
  beforeAll(async () => {
    const newTokenResponse = await tokens.createToken({
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
      url: HOPRD_API_ENDPOINT_1!,
      apiKey: newToken
    });

    expect(tokenInfo).toStrictEqual({
      description: expect.any(String),
      id: expect.any(String),
      capabilities: [
        {
          endpoint: expect.any(String),
          limits: [
            {
              type: expect.any(String),
              used: expect.any(Number),
              conditions: {
                max: expect.any(Number)
              }
            }
          ]
        }
      ]
    });
  });

  test.todo('should delete a token');
});
