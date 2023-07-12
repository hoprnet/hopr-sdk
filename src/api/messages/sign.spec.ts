import nock from 'nock';
import { sign } from './sign';
import { APIError } from '../../utils';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const MESSAGE = 'my-message';

describe('sign', () => {
  afterEach(() => {
    // Remove all mocked endpoints after each test
    jest.resetAllMocks();
    nock.cleanAll();
  });

  it('should sign a message successfully and return 200', async () => {
    const expectedSignature = '7.115342872866815e+167';

    // Mock the sign endpoint with a successful response
    nock(API_ENDPOINT)
      .post('/api/v3/messages/sign', { message: MESSAGE })
      .reply(200, { signature: expectedSignature });

    const signature = await sign({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      message: MESSAGE
    });

    expect(signature).toBe(expectedSignature);
  });

  it('should return 401 if authentication failure', async () => {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_ENDPOINT)
      .post('/api/v3/messages/sign', { message: MESSAGE })
      .reply(401, expectedResponse);

    await expect(
      sign({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT, message: MESSAGE })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization failure', async () => {
    const expectedResponse = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/messages/sign', { message: MESSAGE })
      .reply(403, expectedResponse);

    await expect(
      sign({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT, message: MESSAGE })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure', async () => {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };
    nock(API_ENDPOINT)
      .post('/api/v3/messages/sign', { message: MESSAGE })
      .reply(422, expectedResponse);

    await expect(
      sign({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT, message: MESSAGE })
    ).rejects.toThrow(APIError);
  });
});
