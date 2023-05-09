import nock from 'nock';
import { getHoprBalance } from './getHoprBalance';

const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('getHoprBalance', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return balances if successful', async () => {
    const response = {
      native: '100000000000000000',
      hopr: '1000000000'
    };

    nock(API_URL).get('/api/v2/account/balances').reply(200, response);

    const result = await getHoprBalance(API_URL, API_KEY);
    expect(result).toEqual(response.hopr);
  });

  it('should return 401 if authentication fails', async () => {
    const response = {
      status: 'UNAUTHORIZED',
      error: 'authentication failed'
    };

    nock(API_URL).get('/api/v2/account/balances').reply(401, response);

    const result = await getHoprBalance(API_URL, API_KEY);
    expect(result).toEqual(response);
  });

  it('should return 403 if authorization fails', async () => {
    const response = {
      status: 'UNAUTHORIZED',
      error: 'You are not authorized to perform this action'
    };

    nock(API_URL).get('/api/v2/account/balances').reply(403, response);

    const result = await getHoprBalance(API_URL, API_KEY);
    expect(result).toEqual(response);
  });

  it('should return 422 if unknown failure', async () => {
    const response = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_URL).get('/api/v2/account/balances').reply(422, response);

    const result = await getHoprBalance(API_URL, API_KEY);
    expect(result).toEqual(response);
  });
});
