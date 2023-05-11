import nock from 'nock';
import { APIError } from '../../utils';
import { getTickets } from './getTickets';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getTickets', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH)
      .get(`/api/v2/tickets`)
      .reply(200, [
        {
          counterparty: '16Uiu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQxTWDcmUX5847roBar',
          challenge: 'string',
          epoch: 'string',
          index: 'string',
          amount: 'string',
          winProb: 'string',
          channelEpoch: 'string',
          signature: '115342872866815e167'
        }
      ]);

    const response = await getTickets(BASE_PATH, API_TOKEN);

    expect(response.at(0)?.counterparty).toEqual(
      '16Uiu2HAmVfV4GKQhdECMqYmUMGLy84RjTJQxTWDcmUX5847roBar'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(getTickets(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(getTickets(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(getTickets(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH).get(`/api/v2/tickets`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(getTickets(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
});
