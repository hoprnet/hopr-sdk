import { HoprSDK as SDK } from '../src/sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

describe('tickets E2E Tests', function () {
  test('should get the statistics regarding all your tickets', async function () {
    const response = await sdk.api.tickets.getTicketStatistics();

    expect(response).toStrictEqual({
      unredeemed: expect.any(Number),
      unredeemedValue: expect.any(String),
      redeemed: expect.any(Number),
      redeemedValue: expect.any(String),
      losingTickets: expect.any(Number),
      winProportion: expect.any(Number),
      neglected: expect.any(Number),
      rejected: expect.any(Number),
      rejectedValue: expect.any(String)
    });
  });
});
