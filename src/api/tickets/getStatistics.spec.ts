import nock from 'nock';
import { APIError } from '../../utils';
import { getStatistics } from './getStatistics';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getStatistics', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets/statistics`).reply(200, {
      pending: 0,
      unredeemed: 0,
      unredeemedValue: 'string',
      redeemed: 0,
      redeemedValue: 'string',
      losingTickets: 0,
      winProportion: 0,
      neglected: 0,
      rejected: 0,
      rejectedValue: 'string'
    });

    const response = await getStatistics(BASE_PATH, API_TOKEN);

    expect(response.pending).toEqual(0);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets/statistics`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(getStatistics(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets/statistics`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(getStatistics(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets/statistics`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(getStatistics(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets/statistics`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(getStatistics(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
});
