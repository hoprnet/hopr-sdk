import nock from 'nock';
import { APIError } from '../../utils';
import { setSetting } from './setSetting';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const SETTING = 'strategy';

describe('test getSettings', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(BASE_PATH).put(`/api/v2/settings/${SETTING}`).reply(204);

    const response = await setSetting(BASE_PATH, API_TOKEN, {
      setting: SETTING,
      settingValue: 'passive'
    });

    expect(response).toEqual(true);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(BASE_PATH).put(`/api/v2/settings/${SETTING}`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      setSetting(BASE_PATH, API_TOKEN, {
        setting: SETTING,
        settingValue: 'passive'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(BASE_PATH).put(`/api/v2/settings/${SETTING}`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      setSetting(BASE_PATH, API_TOKEN, {
        setting: SETTING,
        settingValue: 'passive'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(BASE_PATH).put(`/api/v2/settings/${SETTING}`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      setSetting(BASE_PATH, API_TOKEN, {
        setting: SETTING,
        settingValue: 'passive'
      })
    ).rejects.toThrow(APIError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(BASE_PATH).put(`/api/v2/settings/${SETTING}`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      setSetting(BASE_PATH, API_TOKEN, {
        setting: SETTING,
        settingValue: 'passive'
      })
    ).rejects.toThrow(APIError);
  });
});
