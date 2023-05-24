import nock from 'nock';
import { APIError } from '../../utils';
import { redeemTickets } from './redeemTickets';

const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('test redeemTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_URL).post(`/api/v2/tickets/redeem`).reply(204);

    const response = await redeemTickets({ apiKey: API_KEY, url: API_URL });

    expect(response).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_URL).post(`/api/v2/tickets/redeem`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      redeemTickets({ apiKey: API_KEY, url: API_URL })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_URL).post(`/api/v2/tickets/redeem`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      redeemTickets({ apiKey: API_KEY, url: API_URL })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_URL).post(`/api/v2/tickets/redeem`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      redeemTickets({ apiKey: API_KEY, url: API_URL })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_URL).post(`/api/v2/tickets/redeem`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      redeemTickets({ apiKey: API_KEY, url: API_URL })
    ).rejects.toThrow(APIError);
  });
});
