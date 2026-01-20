import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getInfo } from './getInfo';
import { GetInfoResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getInfo', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/node/info`)
      .reply(200, {
        announcedAddress: [
          "/ip4/10.0.2.100/tcp/19092"
        ],
        listeningAddress: [
           "/ip4/10.0.2.100/tcp/19092"
        ],
        providerUrl: 'https://staging.blokli.hoprnet.link',
        hoprNodeSafe: '0x0361a040acb376dd7e5a4643e5a4c7ae9d20c834',
        connectivityStatus: 'Orange',
        channelClosurePeriod: 5
      } as GetInfoResponseType);

    const response = await getInfo({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.hoprNodeSafe).toEqual(
      '0x0361a040acb376dd7e5a4643e5a4c7ae9d20c834'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/info`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getInfo({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/info`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getInfo({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/info`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getInfo({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/node/info`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getInfo({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
