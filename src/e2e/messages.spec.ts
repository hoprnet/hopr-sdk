import { HoprSdk as SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1, HOPRD_API_ENDPOINT_2 } =
  process.env;

const sdk = new SDK({ url: HOPRD_API_ENDPOINT_1!, apiToken: HOPRD_API_TOKEN! });
// const { messages } = sdk.api;

describe('Messages E2E Tests', function () {
  test.todo('test messages');
});
