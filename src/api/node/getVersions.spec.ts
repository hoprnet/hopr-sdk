import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getVersions } from './getVersions';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getVersions', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    const expectedResponse = {
      "apiVersion": "3.10.0",
      "version": "2.1.0"
    }
    nock(API_ENDPOINT).get(`/api/v3/node/version`).reply(200, expectedResponse);

    const response = await getVersions({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(expectedResponse);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/version`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getVersions({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
