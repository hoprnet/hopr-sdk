# Namespace: utils

## Table of contents

### Classes

- [APIError](../classes/utils.APIError.md)
- [DeferredPromise](../classes/utils.DeferredPromise.md)
- [WebsocketHelper](../classes/utils.WebsocketHelper.md)

### Functions

- [createLogger](utils.md#createlogger)
- [createWsUrl](utils.md#createwsurl)
- [fetchWithTimeout](utils.md#fetchwithtimeout)
- [getHeaders](utils.md#getheaders)

## Functions

### createLogger

▸ **createLogger**(`suffix`, `extraInfo?`): `Object`

Creates a a custom logger

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `suffix` | `string` | name of the module you are working on |
| `extraInfo?` | `string` | any other key that can help distinguish where this log is coming from |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `debug` | `Debugger` |
| `error` | `Debugger` |

#### Defined in

[src/utils/log.ts:15](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/log.ts#L15)

___

### createWsUrl

▸ **createWsUrl**(`payload`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.path?` | `string` | optional path for the websocker |

#### Returns

`string`

A string of the complete API endpoint.

#### Defined in

[src/utils/functions.ts:12](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/functions.ts#L12)

___

### fetchWithTimeout

▸ **fetchWithTimeout**(`apiEndpoint`, `options`, `ms?`): `Promise`<`Response`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `apiEndpoint` | `URL` \| `RequestInfo` | `undefined` |
| `options` | `undefined` \| `RequestInit` | `undefined` |
| `ms` | `number` | `30000` |

#### Returns

`Promise`<`Response`\>

#### Defined in

[src/utils/fetchWithTimeout.ts:3](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/fetchWithTimeout.ts#L3)

___

### getHeaders

▸ **getHeaders**(`apiToken`): `Headers`

Generates the headers needed for making API requests.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiToken` | `string` | The API token to include in the headers. |

#### Returns

`Headers`

The headers for making API requests.

#### Defined in

[src/utils/headers.ts:9](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/headers.ts#L9)
