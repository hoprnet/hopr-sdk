import { HoprSDK as SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});
const { tickets } = sdk.api;

describe('tickets E2E Tests', function () {
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
