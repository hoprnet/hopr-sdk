import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getChannelsCorrupted } from './getChannelsCorrupted';
import { GetChannelsCorruptedResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const REZ = {
  "channelIds": [
    "0x3feda2820d7365ad9e0d0785020f7e18297ecb0c176f600ad6b82d6b4ec656a5",
    "0x994f8ed6aa20cb94a2e00dc35562524084811ad6d195e4ee192a1275fd832d24",
    "0xe4a79463ae58e46824cc37ffbbcdafc7ccc831c704302fe7ab8c5bd8debc173c",
    "0xf3ed53499206c2e20b586a610bcd6353f8b5e9d8e13b72cfaa35a7bceea5ee5d",
    "0xaed4dd18e48788a940703421c9fee623362fb167bee776dcc6eb32be0fd7a3ef",
    "0xff634098829fc552ad6df90b315827ab2faccce0c47b5d6769f3f1023fe19703",
    "0xa108c8747553913fe845ad6093fe06b6d08392856176a2c6e70e507d3e264a6d",
    "0xe1090bdf50836de2a8bdceb8ad7481042aa0bdddf757b636ff070acb50975ebe",
    "0xf2b334c4efcad0e1e0b49c378da4715dcf6056cb4f8bc086965e9661f6d02f3b",
    "0xe910415e5fa543dbf62d2f45347f8a5839d51d3fbc3d7bd653d1f1cff0ad5a97",
    "0xf5d8f3778860f8f651c096022cb578e2f856492816f97f9717a05dd841a45205",
    "0x36787d99ce67380ccc17d968233a627f6b0b44e849ead3cf6e09187b1144d3eb",
    "0xeee458f1eb8fd0465e549d994997697dd9e779551aa01c68e4058e5807ffd605",
    "0xcafd50dbb1110c1a50fe181815058fce90a46b282a90ce5b090ca351757e691e"
  ]
};

describe('test getChannelsCorrupted', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/channels/corrupted`)
      .reply(200, REZ as GetChannelsCorruptedResponseType);

    const response = await getChannelsCorrupted({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(REZ);
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/corrupted`).reply(400, {
      status: 'INVALID_PEERID'
    });

    await expect(
      getChannelsCorrupted({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/corrupted`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getChannelsCorrupted({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/corrupted`).reply(403, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getChannelsCorrupted({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/channels/corrupted`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getChannelsCorrupted({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
});
