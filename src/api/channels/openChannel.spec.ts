import nock from 'nock';
import { APIError } from '../../utils';
import { openChannel } from './openChannel';

const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('test openChannel', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_URL).post('/api/v2/channels').reply(201, {
      channelId:
        '0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5',
      receipt:
        '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    });

    const response = await openChannel({
      apiKey: API_KEY,
      url: API_URL,
      peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
      amount: '1000000'
    });

    expect(response.channelId).toEqual(
      '0x04e50b7ddce9770f58cebe51f33b472c92d1c40384759f5a0b1025220bf15ec5'
    );
    expect(response.receipt).toEqual(
      '0x37954ca4a630aa28f045df2e8e604cae22071046042e557355acf00f4ef20d2e'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_URL).post('/api/v2/channels').reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      openChannel({
        apiKey: API_KEY,
        url: API_URL,
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        amount: '1000000'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_URL).post('/api/v2/channels').reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      openChannel({
        apiKey: API_KEY,
        url: API_URL,
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        amount: '1000000'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_URL).post('/api/v2/channels').reply(403, {
      status: 'NOT_ENOUGH_BALANCE'
    });

    await expect(
      openChannel({
        apiKey: API_KEY,
        url: API_URL,
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        amount: '1000000'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 409 error', async function () {
    nock(API_URL).post('/api/v2/channels').reply(403, {
      status: 'CHANNEL_ALREADY_OPEN'
    });

    await expect(
      openChannel({
        apiKey: API_KEY,
        url: API_URL,
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        amount: '1000000'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_URL).post('/api/v2/channels').reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });
    await expect(
      openChannel({
        apiKey: API_KEY,
        url: API_URL,
        peerId: '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12',
        amount: '1000000'
      })
    ).rejects.toThrow(APIError);
  });
});