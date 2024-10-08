import nock from 'nock';
import { sdkApiError } from '../../utils';
import { isNodeStarted } from './isNodeStarted';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test pingPeer', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response (node started)', async function () {
    nock(API_ENDPOINT).get(`/startedz`).reply(200);

    const response = await isNodeStarted({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(true);
  });
  it('handles successful response (node not started)', async function () {
    nock(API_ENDPOINT).get(`/startedz`).reply(412);

    const response = await isNodeStarted({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response).toEqual(false);
  });
});
