import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getGraph } from './getGraph';
import { GetGraphResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('test getGraph', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response with 3 queries: true ', async function () {
    const expectedResponse: GetGraphResponseType = 'string';

    const mockedFunction = nock(API_ENDPOINT).get(`/api/v3/node/graph?ignoreDisconnectedComponents=true&ignoreNonOpenedChannels=true&rawGraph=true`).reply(200, expectedResponse);

    console.log('mockedFunction', mockedFunction)

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      ignoreDisconnectedComponents: true,
      ignoreNonOpenedChannels: true,
      rawGraph: true,
    });

    expect(response).toEqual(expectedResponse);
  });
  it('handles successful response with 3 queries: false ', async function () {
    const expectedResponse: GetGraphResponseType = 'string';

    const mockedFunction = nock(API_ENDPOINT).get(`/api/v3/node/graph?ignoreDisconnectedComponents=false&ignoreNonOpenedChannels=false&rawGraph=false`).reply(200, expectedResponse);

    console.log('mockedFunction', mockedFunction)

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      ignoreDisconnectedComponents: false,
      ignoreNonOpenedChannels: false,
      rawGraph: false,
    });

    expect(response).toEqual(expectedResponse);
  });
  it('handles successful response with 3 mixed queries: false ', async function () {
    const expectedResponse: GetGraphResponseType = 'string';

    const mockedFunction = nock(API_ENDPOINT).get(`/api/v3/node/graph?ignoreDisconnectedComponents=false&ignoreNonOpenedChannels=true&rawGraph=false`).reply(200, expectedResponse);

    console.log('mockedFunction', mockedFunction)

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      ignoreDisconnectedComponents: false,
      ignoreNonOpenedChannels: true,
      rawGraph: false,
    });

    expect(response).toEqual(expectedResponse);
  });
  it('handles successful response with 2 mixed queries', async function () {
    const expectedResponse: GetGraphResponseType = 'string';

    const mockedFunction = nock(API_ENDPOINT).get(`/api/v3/node/graph?ignoreNonOpenedChannels=true&rawGraph=false`).reply(200, expectedResponse);

    console.log('mockedFunction', mockedFunction)

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      ignoreNonOpenedChannels: true,
      rawGraph: false,
    });

    expect(response).toEqual(expectedResponse);
  });
  it('handles successful response with ignoreDisconnectedComponents: true query', async function () {
    const expectedResponse: GetGraphResponseType = 'string';

    const mockedFunction = nock(API_ENDPOINT).get(`/api/v3/node/graph?ignoreDisconnectedComponents=true`).reply(200, expectedResponse);

    console.log('mockedFunction', mockedFunction)

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      ignoreDisconnectedComponents: true
    });

    expect(response).toEqual(expectedResponse);
  });
  it('handles successful response with ignoreNonOpenedChannels: true query', async function () {
    const expectedResponse: GetGraphResponseType = 'string';

    const mockedFunction = nock(API_ENDPOINT).get(`/api/v3/node/graph?ignoreNonOpenedChannels=true`).reply(200, expectedResponse);

    console.log('mockedFunction', mockedFunction)

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      ignoreNonOpenedChannels: true
    });

    expect(response).toEqual(expectedResponse);
  });
  it('handles successful response with rawGraph: true query', async function () {
    const expectedResponse: GetGraphResponseType = 'string';

    const mockedFunction = nock(API_ENDPOINT).get(`/api/v3/node/graph?rawGraph=true`).reply(200, expectedResponse);

    console.log('mockedFunction', mockedFunction)

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      rawGraph: true
    });

    expect(response).toEqual(expectedResponse);
  });
  it('handles successful response with rawGraph: false query', async function () {
    const expectedResponse: GetGraphResponseType = 'string';

    const mockedFunction = nock(API_ENDPOINT).get(`/api/v3/node/graph?rawGraph=false`).reply(200, expectedResponse);

    console.log('mockedFunction', mockedFunction)

    const response = await getGraph({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT,
      rawGraph: false
    });

    expect(response).toEqual(expectedResponse);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v3/node/graph`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getGraph({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
});
