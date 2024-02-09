import nock from 'nock';
import { APIError } from '../../utils';
import { isNodeReady } from './isNodeReady';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test pingPeer', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response (node healthy)', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/readyz`)
      .reply(200);

    const response = await isNodeReady({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(true);
  });
  it('handles successful response (node not healthy)', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v3/readyz`)
      .reply(412);

    const response = await isNodeReady({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(false);
  });
});
