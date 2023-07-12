import nock from 'nock';
import { getHoprBalance } from './getHoprBalance';
import { APIError } from '../../utils';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('getHoprBalance', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return balances if successful', async () => {
    const response = {
      native: '100000000000000000',
      hopr: '1000000000'
    };

    nock(API_ENDPOINT).get('/api/v3/account/balances').reply(200, response);

    const result = await getHoprBalance({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });
    expect(result).toEqual(response.hopr);
  });

  it('should return 401 if authentication fails', async () => {
    const response = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_ENDPOINT).get('/api/v3/account/balances').reply(401, response);

    await expect(
      getHoprBalance({ apiEndpoint: API_ENDPOINT, apiToken: API_TOKEN })
    ).rejects.toThrow(APIError);
  });

  it('should return 403 if authorization fails', async () => {
    const response = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_ENDPOINT).get('/api/v3/account/balances').reply(403, response);

    await expect(
      getHoprBalance({ apiEndpoint: API_ENDPOINT, apiToken: API_TOKEN })
    ).rejects.toThrow(APIError);
  });

  it('should return 422 if unknown failure', async () => {
    const response = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_ENDPOINT).get('/api/v3/account/balances').reply(422, response);

    await expect(
      getHoprBalance({ apiEndpoint: API_ENDPOINT, apiToken: API_TOKEN })
    ).rejects.toThrow(APIError);
  });
});
