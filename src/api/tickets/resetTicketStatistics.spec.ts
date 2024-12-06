import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getTicketStatistics } from './getTicketStatistics';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getTicketStatistics', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT).get(`/api/v3/tickets/statistics`).reply(200, {
      neglectedValue: 'string',
      redeemedValue: 'string',
      rejectedValue: 'string',
      unredeemedValue: 'string',
      winningCount: 0
    });

    const response = await getTicketStatistics({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.winningCount).toEqual(0);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/tickets/statistics`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/tickets/statistics`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/tickets/statistics`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/tickets/statistics`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getTicketStatistics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
