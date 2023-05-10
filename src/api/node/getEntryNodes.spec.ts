import nock from 'nock';
import { APIError } from '../../utils';
import { getEntryNodes } from './getEntryNodes';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getEntryNodes', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH)
      .get(`/api/v2/node/entryNodes`)
      .reply(200, {
        '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn12': {
          multiaddrs: ['/ip4/'],
          isEligible: false
        },
        '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn13': {
          multiaddrs: ['/ip4/'],
          isEligible: false
        },
        '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn14': {
          multiaddrs: ['/ip4/'],
          isEligible: true
        },
        '16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn15': {
          multiaddrs: ['/ip4/'],
          isEligible: false
        }
      });

    const response = await getEntryNodes(BASE_PATH, API_TOKEN);

    expect(
      response['16Uiu2HAmUsJwbECMroQUC29LQZZWsYpYZx1oaM1H9DBoZHLkYn14']
        ?.isEligible
    ).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/entryNodes`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(getEntryNodes(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/entryNodes`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(getEntryNodes(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/entryNodes`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(getEntryNodes(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH).get(`/api/v2/node/entryNodes`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(getEntryNodes(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
});
