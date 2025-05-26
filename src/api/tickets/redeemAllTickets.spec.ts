import nock from 'nock';
import { sdkApiError } from '../../utils';
import { redeemAllTickets } from './redeemAllTickets';
import { ZodError } from 'zod';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test redeemAllTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(204);

    const response = await redeemAllTickets({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(400, {
      status: 'INVALID_ERROR'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws the node is not ready when hoprd api response is an 412 error ', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(412, {
      status: 'the node is not ready',
      error: 'the node is not ready'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a ZodError when response cannot be parsed as ApiErrorResponse', async function () {
    nock(API_ENDPOINT).post(`/api/v3/tickets/redeem`).reply(400, {
      unexpectedFormat: 'This is not the expected error format'
    });

    await expect(
      redeemAllTickets({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
});
