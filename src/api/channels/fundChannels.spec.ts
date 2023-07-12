import nock from 'nock';
import { fundChannels } from './fundChannels';
import { APIError } from '../../utils';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test fundChannels', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT).post('/api/v3/fundmulti').reply(201, {
      receipt:
        '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    });

    const response = await fundChannels({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
      outgoingAmount: '1000000',
      incomingAmount: '1000000'
    });

    expect(response.receipt).toEqual(
      '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).post('/api/v3/fundmulti').reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      fundChannels({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        outgoingAmount: '1000000',
        incomingAmount: '1000000'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).post('/api/v3/fundmulti').reply(403, {
      status: 'NOT_ENOUGH_BALANCE'
    });

    await expect(
      fundChannels({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        outgoingAmount: '1000000',
        incomingAmount: '1000000'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).post('/api/v3/fundmulti').reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });
    await expect(
      fundChannels({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT,
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        outgoingAmount: '1000000',
        incomingAmount: '1000000'
      })
    ).rejects.toThrow(APIError);
  });
});
