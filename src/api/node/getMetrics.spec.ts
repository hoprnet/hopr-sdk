import nock from 'nock';
import { APIError } from '../../utils';
import { getMetrics } from './getMetrics';

const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('test getMetrics', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_URL).get(`/api/v2/node/metrics`).reply(200, 'metrics');

    const response = await getMetrics({ apiKey: API_KEY, url: API_URL });

    expect(response).toEqual('metrics');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_URL).get(`/api/v2/node/metrics`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(getMetrics({ apiKey: API_KEY, url: API_URL })).rejects.toThrow(
      APIError
    );
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_URL).get(`/api/v2/node/metrics`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(getMetrics({ apiKey: API_KEY, url: API_URL })).rejects.toThrow(
      APIError
    );
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_URL).get(`/api/v2/node/metrics`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(getMetrics({ apiKey: API_KEY, url: API_URL })).rejects.toThrow(
      APIError
    );
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_URL).get(`/api/v2/node/metrics`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(getMetrics({ apiKey: API_KEY, url: API_URL })).rejects.toThrow(
      APIError
    );
  });
});
