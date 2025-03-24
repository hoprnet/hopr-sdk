import nock from 'nock';
import { sdkApiError } from '../../utils';
import { resetTicketStatistics } from './resetTicketStatistics';
import { ZodError } from 'zod';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test resetTicketStatistics', function () {
  beforeEach(function () {
    nock.cleanAll();
  });

  it('handles successful response (204)', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(204);

    const response = await resetTicketStatistics({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(true);
  });

  it('throws an Error when server returns 500+ error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(500, 'Server Error');

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(Error);
  });

  it('throws a custom error when hoprd api response is a 400 error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });

  it('throws a custom error when hoprd api response is a 401 error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(401, {
      status: 'UNAUTHORIZED',
      error: 'Invalid token'
    });

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });

  it('throws a custom error when hoprd api response is a 403 error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(403, {
      status: 'FORBIDDEN',
      error: 'Access denied'
    });

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });

  it('throws a custom error when hoprd api response is a 422 error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(422, {
      status: 'UNPROCESSABLE_ENTITY',
      error: 'Cannot process request'
    });

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });

  it('throws a ZodError when response cannot be parsed as ApiErrorResponse', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(400, {
      unexpectedFormat: 'This is not the expected error format'
    });

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
});
