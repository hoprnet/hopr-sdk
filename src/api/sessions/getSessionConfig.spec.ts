import nock from 'nock';
import { getSessionConfig } from './getSessionConfig';
import { sdkApiError } from '../../utils';
import { GetSessionConfigPayloadResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const SESSION_ID = 'abc:123';

describe('getSessionConfig', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return a sessions corresponding config if 200', async function () {
    const expectedResponse: GetSessionConfigPayloadResponseType = {
      "maxSurbUpstream": "2 Mbps",
      "responseBuffer": "2 MB"
    };

    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .reply(200, expectedResponse);

    const result = await getSessionConfig({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      sessionId: SESSION_ID
    });

    expect(result).toEqual(expectedResponse);
  });

  it('should return an 422 when there is an unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_ENDPOINT)
      .get(`/api/v4/session/config/${SESSION_ID}`)
      .reply(422, expectedResponse);

    await expect(
      getSessionConfig({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        sessionId: SESSION_ID
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should return a status 500', async function () {
    nock(API_ENDPOINT).get(`/api/v4/session/config/${SESSION_ID}`).reply(500);

    await expect(
      getSessionConfig({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        sessionId: SESSION_ID
      })
    ).rejects.toThrow(sdkApiError);
  });
});
