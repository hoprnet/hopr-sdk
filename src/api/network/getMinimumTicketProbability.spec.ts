import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getMinimumTicketProbability } from './getMinimumTicketProbability';
import { GetMinimumNetworkProbabilityResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getMinimumTicketProbability', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/network/probability`)
      .reply(200, {
        probability: 0.5
      } as GetMinimumNetworkProbabilityResponseType);

    const response = await getMinimumTicketProbability({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.probability).toEqual(0.5);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/network/probability`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/network/probability`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
});
