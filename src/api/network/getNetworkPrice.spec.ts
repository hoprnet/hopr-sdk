import nock from 'nock';
import { APIError } from '../../utils';
import { getNetworkPrice } from './getNetworkPrice';
import { GetNetworkPriceResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test pingPeer', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .post(`/api/v3/network/price`)
      .reply(200, {
        price: '1000000'
      } as GetNetworkPriceResponseType);

    const response = await getNetworkPrice({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.price).toEqual('1000000');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/network/price`).reply(400, {
      status: 400,
      statusText: 'INVALID_PEERID'
    });

    await expect(
      getNetworkPrice({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/network/price`).reply(401, {
      status: 401,
      statusText: 'string',
      error: 'string'
    });

    await expect(
      getNetworkPrice({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/network/price`).reply(403, {
      status: 403,
      statusText: 'string',
      error: 'string'
    });

    await expect(
      getNetworkPrice({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/network/price`).reply(422, {
      status: 422,
      statusText: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getNetworkPrice({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(APIError);
  });
});
