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
      .get(`/api/v3/node/info`)
      .reply(200, {
        network: 'rotsee',
        announcedAddress: [],
        listeningAddress: [],
        chain: '',
        hoprToken: '0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1',
        hoprChannels: '0x4c3bb6470b72A749Db1bB394c024A92AB60a793e',
        hoprNetworkRegistry: '0x2f3243adC9805F6dd3E01C9E9ED31675A5B16902',
        hoprNodeSafeRegistry: '0x3E7c4720934ff6A9FE122Cb761f36a11E9b848D9',
        hoprManagementModule: '0x39b0445b32f5a544eb7917912f5f837bd061be4c',
        hoprNodeSafe: '0x0361a040acb376dd7e5a4643e5a4c7ae9d20c834',
        indexerBlock: 35346732,
        indexerChecksum: "0xe780bd95f350e96fe30e98d17560ade3c892f0d3bd75d681f99b0d3c1690517d",
        isEligible: false,
        connectivityStatus: 'Orange',
        channelClosurePeriod: 5
      } as GetInfoResponseType);

    const response = await getInfo({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.hoprToken).toEqual(
      '0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1'
    );
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/info`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getInfo({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/info`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getInfo({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/info`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getInfo({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/info`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getInfo({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
