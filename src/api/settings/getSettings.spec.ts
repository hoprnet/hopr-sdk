import nock from 'nock';
import { APIError } from '../../utils';
import { getSettings } from './getSettings';

const API_URL = 'http://localhost:3001';
const API_KEY = 'S3CR3T-T0K3N';

describe('test getSettings', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_URL).get(`/api/v2/settings`).reply(200, {
      includeRecipient: true,
      strategy: 'passive'
    });

    const response = await getSettings({ apiKey: API_KEY, url: API_URL });

    expect(response.strategy).toEqual('passive');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_URL).get(`/api/v2/settings`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getSettings({ apiKey: API_KEY, url: API_URL })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_URL).get(`/api/v2/settings`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getSettings({ apiKey: API_KEY, url: API_URL })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_URL).get(`/api/v2/settings`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getSettings({ apiKey: API_KEY, url: API_URL })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_URL).get(`/api/v2/settings`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getSettings({ apiKey: API_KEY, url: API_URL })
    ).rejects.toThrow(APIError);
  });
});
