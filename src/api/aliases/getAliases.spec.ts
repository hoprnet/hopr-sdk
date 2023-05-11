import nock from 'nock';
import { getAliases } from './getAliases';
import { APIError } from '../../utils';

const BASE_PATH = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('getAliases', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return a list of aliases with their corresponding peerIds if 200', async function () {
    const expectedResponse = {
      alice: '0x1234567890123456789012345678901234567890',
      bob: '0x0987654321098765432109876543210987654321'
    };

    nock(BASE_PATH).get('/api/v2/aliases').reply(200, expectedResponse);

    const result = await getAliases(BASE_PATH, API_TOKEN);

    expect(result).toEqual(expectedResponse);
  });

  it('should return an 422 when there is an unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(BASE_PATH).get('/api/v2/aliases').reply(422, expectedResponse);

    await expect(getAliases(BASE_PATH, API_TOKEN)).rejects.toThrow(APIError);
  });
});
