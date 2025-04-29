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
  it('handles successful response', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(204);

    const response = await resetTicketStatistics({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).delete(`/api/v3/tickets/statistics`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws an Error when server returns 500+ error', async function () {
    nock(API_ENDPOINT)
      .delete(`/api/v3/tickets/statistics`)
      .reply(500, 'Server Error');

    await expect(
      resetTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(Error);
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
