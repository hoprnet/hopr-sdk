import nock from 'nock';
import { APIError } from '../../utils';
import { redeemTickets } from './redeemTickets';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test redeemTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(204);

    const response = await redeemTickets({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(400, {
      status: 422,
      statusText: 'INVALID_PEERID'
    });

    await expect(
      redeemTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(401, {
      status: 401,
      statusText: 'string',
      error: 'string'
    });

    await expect(
      redeemTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(403, {
      status: 422,
      statusText: 'string',
      error: 'string'
    });

    await expect(
      redeemTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(422, {
      status: 422,
      statusText: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      redeemTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
});
