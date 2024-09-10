import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getTicketPrice } from './getTicketPrice';
import { GetTicketPriceResponseType } from '../../types';

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
      } as GetTicketPriceResponseType);

    const response = await getTicketPrice({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.price).toEqual('1000000');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/network/price`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getTicketPrice({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/network/price`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getTicketPrice({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/network/price`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getTicketPrice({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post(`/api/v3/network/price`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getTicketPrice({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
});
