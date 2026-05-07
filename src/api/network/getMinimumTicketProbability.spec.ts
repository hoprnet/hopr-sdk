import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { getMinimumTicketProbability } from './getMinimumTicketProbability';
import { GetMinimumNetworkProbabilityResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

const startHangingServer = async () => {
  nock.enableNetConnect('127.0.0.1');
  const server = http.createServer(() => {});
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve())
  );
  const port = (server.address() as import('net').AddressInfo).port;
  const stop = async () => {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
    nock.disableNetConnect();
  };
  return { url: `http://127.0.0.1:${port}`, stop };
};

describe('test getMinimumTicketProbability', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/probability`)
      .reply(200, {
        probability: 0.5
      } as GetMinimumNetworkProbabilityResponseType);

    const response = await getMinimumTicketProbability({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.probability).toEqual(0.5);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/network/probability`).reply(401, {
      status: 'string',
      error: 'string'
    });

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT).get(`/api/v4/network/probability`).reply(422, {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    });

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body fails the response schema', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/probability`)
      .reply(200, { probability: 'not-a-number' });

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(ZodError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/probability`)
      .reply(200, { unexpected: 'shape' });

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getMinimumTicketProbability({
          apiToken: API_TOKEN,
          apiEndpoint: url,
          timeout: 100
        })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/probability`)
      .replyWithError('ECONNREFUSED');

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/probability`)
      .reply(200, 'not-json');

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow();
  });
  it('throws sdkApiError when the api responds with a 500', async function () {
    nock(API_ENDPOINT)
      .get(`/api/v4/network/probability`)
      .reply(500, { status: 'INTERNAL_SERVER_ERROR' });

    await expect(
      getMinimumTicketProbability({
        apiToken: API_TOKEN,
        apiEndpoint: API_ENDPOINT
      })
    ).rejects.toThrow(sdkApiError);
  });
});
