import nock from 'nock';
import http from 'http';
import { ZodError } from 'zod';
import { sdkApiError } from '../../utils';
import { getChannels } from './getChannels';
import { GetChannelsResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

const startHangingServer = async () => {
  nock.enableNetConnect('127.0.0.1');
  const server = http.createServer(() => {});
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve())
  );
  const port = (server.address() as any).port;
  const stop = async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
    nock.disableNetConnect();
  };
  return { url: `http://127.0.0.1:${port}`, stop };
};

describe('test getChannels', function () {
  beforeEach(function () {
    nock.cleanAll();
  });
  it('handles successful response', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(200, {
        incoming: [
          {
            id: '0x00e846e435ec570cda9dcfd0c8fa8fbade524228f9521de954ee919fee3322b8',
            peerAddress: '0x0987654321098765432109876543210987654321',
            status: 'Open',
            balance: '500000000000000000'
          }
        ],
        outgoing: [
          {
            id: '0xecc80ea0f680833f04b05adfeaed745be42bd130570adca3ad65f11a1650fac8',
            peerAddress: '0x0987654321098765432109876543210987654321',
            status: 'Open',
            balance: '500000000000000000'
          }
        ],
        all: [
          {
            channelId:
              '0x00023da9f252f16970ed0987153e5e64fdae0f41799b6a87306e12d17d060301',
            source: '0xbFdbE0e896C989b23D6cA83E12AD4df1739B6E28',
            destination: '0xaB51F95ED1Fa8d4afE40A3a1B8f44A242307390c',
            balance: '100000000000000000',
            status: 'Open',
            ticketIndex: 0,
            channelEpoch: 1,
            closureTime: 0
          }
        ]
      } as GetChannelsResponseType);

    const response = await getChannels({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    expect(response.incoming.at(0)?.peerAddress).toEqual(
      '0x0987654321098765432109876543210987654321'
    );
    expect(response.outgoing.at(0)?.balance).toEqual('500000000000000000');
  });
  it('throws a custom error when hoprd api response is an 400 error', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(400, {
        status: 'INVALID_PEERID'
      });

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 401 error', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(401, {
        status: 'UNAUTHORIZED',
        error: 'authentication failed'
      });

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 403 error', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(403, {
        status: 'NOT_ENOUGH_BALANCE'
      });

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws a custom error when hoprd api response is an 422 error', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(422, {
        status: 'UNKNOWN_FAILURE',
        error: 'Full error message.'
      });

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(sdkApiError);
  });
  it('throws ZodError when 200 body matches neither response schema nor ApiErrorResponse', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(200, { unexpected: 'shape' });

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow(ZodError);
  });
  it('rejects with TIMEOUT when the request exceeds the timeout', async function () {
    const { url, stop } = await startHangingServer();
    try {
      await expect(
        getChannels({ apiToken: API_TOKEN, apiEndpoint: url, timeout: 100 })
      ).rejects.toThrow('TIMEOUT');
    } finally {
      await stop();
    }
  });
  it('rejects when the connection errors', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .replyWithError('ECONNREFUSED');

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
  it('rejects when response body is malformed JSON', async function () {
    nock(API_ENDPOINT)
      .get('/api/v4/channels?includingClosed=false&fullTopology=false')
      .reply(200, 'not-json');

    await expect(
      getChannels({ apiToken: API_TOKEN, apiEndpoint: API_ENDPOINT })
    ).rejects.toThrow();
  });
});
