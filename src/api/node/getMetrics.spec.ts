import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getMetrics } from './getMetrics';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getMetrics', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/metrics`).reply(200, 'metrics');

    const response = await getMetrics({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual('metrics');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/metrics`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getMetrics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/metrics`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getMetrics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/metrics`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getMetrics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/metrics`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getMetrics({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
