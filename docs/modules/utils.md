[@hoprnet/hopr-sdk](../README.md) / [Exports](../modules.md) / utils

# Namespace: utils

## Table of contents

### Classes

- [APIError](../classes/utils.APIError.md)

### Functions

- [createLogger](utils.md#createlogger)
- [decodeMessage](utils.md#decodemessage)
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

[src/utils/log.ts:15](https://github.com/hoprnet/hopr-sdk/blob/3ed1006/src/utils/log.ts#L15)

___

### decodeMessage

▸ **decodeMessage**(`msg`): `string`

Decodes the message received by a hoprd node

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to decode |

#### Returns

`string`

a string representing the decoded message

#### Defined in

[src/utils/functions.ts:9](https://github.com/hoprnet/hopr-sdk/blob/3ed1006/src/utils/functions.ts#L9)

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

[src/utils/fetchWithTimeout.ts:4](https://github.com/hoprnet/hopr-sdk/blob/3ed1006/src/utils/fetchWithTimeout.ts#L4)

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

[src/utils/headers.ts:9](https://github.com/hoprnet/hopr-sdk/blob/3ed1006/src/utils/headers.ts#L9)
