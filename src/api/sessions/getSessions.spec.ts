import nock from 'nock';
import { getSessions } from './getSessions';
import { sdkApiError } from '../../utils';
import { GetSessionsResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';
const PROTOCOL = 'udp';

describe('getSessions', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return a list of sessions with their corresponding data if 200', async function () {
    const expectedResponse: GetSessionsResponseType = [
      {
        ip: '127.0.0.1',
        port: 5542,
        protocol: PROTOCOL,
        target: 'example.com:80',
        path: {
          Hops: 1
        }
      },
      {
        ip: '127.0.0.1',
        port: 5543,
        protocol: PROTOCOL,
        target: 'example.com:80',
        path: {
          Hops: 2
        }
      }
    ];

    nock(API_ENDPOINT)
      .get(`/api/v3/session/${PROTOCOL}`)
      .reply(200, expectedResponse);

    const result = await getSessions({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN,
      protocol: PROTOCOL
    });

    expect(result).toEqual(expectedResponse);
  });

  it('should return an 422 when there is an unknown failure', async function () {
    const expectedResponse = {
      status: 'UNKNOWN_FAILURE',
      error: 'Full error message.'
    };

    nock(API_ENDPOINT)
      .get(`/api/v3/session/${PROTOCOL}`)
      .reply(422, expectedResponse);

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow(sdkApiError);
  });

  it('should return a status 500', async function () {
    nock(API_ENDPOINT).get(`/api/v3/session/${PROTOCOL}`).reply(500);

    await expect(
      getSessions({
        apiEndpoint: API_ENDPOINT,
        apiToken: API_TOKEN,
        protocol: PROTOCOL
      })
    ).rejects.toThrow(sdkApiError);
  });
});
