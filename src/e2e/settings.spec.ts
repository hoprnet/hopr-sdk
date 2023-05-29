import { HoprSdk as SDK } from '../sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;

const sdk = new SDK({ url: HOPRD_API_ENDPOINT_1!, apiKey: HOPRD_API_TOKEN! });
const { settings } = sdk.api;

describe('settings E2E Tests', function () {
  test("should get all node' settings", async function () {
    const response = await settings.getSettings();

    expect(response).toStrictEqual({
      includeRecipient: expect.any(Boolean),
      strategy: expect.any(String)
    });
  });

  test('should update the nodes setting values', async function () {
    const oldSettings = await settings.getSettings();

    await settings.setSetting({
      setting: 'includeRecipient',
      settingValue: true
    });

    const newSettings = await settings.getSettings();

    expect(newSettings).not.toEqual(oldSettings);
  });
});
