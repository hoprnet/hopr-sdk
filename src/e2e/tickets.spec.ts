import { HoprSdk as SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;

const sdk = new SDK({ url: HOPRD_API_ENDPOINT_1!, apiKey: HOPRD_API_TOKEN! });
const { tickets } = sdk.api;

describe('settings E2E Tests', function () {
  test('should get the statistics regarding all your tickets', async function () {
    const response = await tickets.getStatistics();

    expect(response).toStrictEqual({
      pending: expect.any(Number),
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

  test('should get all tickets earned', async function () {
    const response = await tickets.getTickets();

    expect(response).toEqual([]);
  });
});
