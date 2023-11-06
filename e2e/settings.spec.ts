import { HoprSDK as SDK } from '../src/sdk';

const { HOPRD_API_TOKEN, HOPRD_API_ENDPOINT_1 } = process.env;

const sdk = new SDK({
  apiEndpoint: HOPRD_API_ENDPOINT_1!,
  apiToken: HOPRD_API_TOKEN!
});

describe('settings E2E Tests', function () {
  test("should get all node' settings", async function () {
    const response = await sdk.api.settings.getSettings();

    expect(response).toStrictEqual({
      includeRecipient: expect.any(Boolean)
    });
  });

  test('should update the nodes setting values', async function () {
    const oldSettings = await sdk.api.settings.getSettings();

    await sdk.api.settings.setSetting({
      setting: 'includeRecipient',
      settingValue: !oldSettings.includeRecipient
    });

    const newSettings = await sdk.api.settings.getSettings();
    expect(newSettings).toBeDefined();
    expect(newSettings).not.toEqual(oldSettings);
  });
});
