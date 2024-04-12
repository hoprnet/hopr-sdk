import nock from 'nock';
import { APIError } from '../../utils';
import { getVersion } from './getVersion';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getVersion', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/version`).reply(200, {
      version: '2.1.0'
    });

    const response = await getVersion({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual('2.1.0');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/version`).reply(400, {
      status: 400,
      statusText: 'INVALID_PEERID'
    });

    await expect(
      getVersion({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/version`).reply(401, {
      status: 401,
      statusText: 'string',
      error: 'string'
    });

    await expect(
      getVersion({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/version`).reply(403, {
      status: 403,
      statusText: 'string',
      error: 'string'
    });

    await expect(
      getVersion({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/version`).reply(422, {
      status: 422,
      statusText: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getVersion({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(APIError);
  });
});
