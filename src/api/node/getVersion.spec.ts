import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getVersion } from './getVersion';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getVersion', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/version`).reply(200, {
      apiVersion: '3.10.0',
      version: '2.2.2'
    });

    const response = await getVersion({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual('2.2.2');
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/version`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getVersion({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
