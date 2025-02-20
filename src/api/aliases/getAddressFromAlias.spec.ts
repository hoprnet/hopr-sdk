import { getAddressFromAlias } from './getAddressFromAlias';
import nock from 'nock';
import { sdkApiError } from '../../utils';
import { GetAddressFromAliasResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const ALIAS = 'my-alias';

describe('getAddressFromAlias', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should return peerId when provided alias exists', async function () {
    const expectedPeerId = '0x1234567890123456789012345678901234567890';
    nock(API_ENDPOINT)
      .get(`/api/v3/aliases_addresses/${ALIAS}`)
      .reply(200, { address: expectedPeerId } as GetAddressFromAliasResponseType);

    const result = await getAddressFromAlias({
      alias: ALIAS,
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(result).toBe(expectedPeerId);
  });

  it('should return 401 when authentication fails', async function () {
    const expectedResponse = {
      status: 'authentication failed',
      error: 'authentication failed'
    };
    nock(API_ENDPOINT)
      .get(`/api/v3/aliases_addresses/${ALIAS}`)
      .reply(401, expectedResponse);

    await expect(
      getAddressFromAlias({
        alias: ALIAS,
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should return 404 when alias is not found', async function () {
    const expectedStatus = 'PEERID_NOT_FOUND';
    nock(API_ENDPOINT)
      .get(`/api/v3/aliases_addresses/${ALIAS}`)
      .reply(404, { status: expectedStatus });

    await expect(
      getAddressFromAlias({
        alias: ALIAS,
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });

});
