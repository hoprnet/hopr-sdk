# Namespace: utils

## Table of contents

### Classes

- [sdkApiError](../classes/utils.sdkApiError.md)

### Functions

- [createLogger](utils.md#createlogger)
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

[src/utils/log.ts:15](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/utils/log.ts#L15)

___

### fetchWithTimeout

▸ **fetchWithTimeout**(`apiEndpoint`, `options?`, `ms?`): `Promise`\<`Response`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `apiEndpoint` | `URL` \| `RequestInfo` | `undefined` |
| `options?` | `RequestInit` | `undefined` |
| `ms` | `number` | `30000` |

#### Returns

`Promise`\<`Response`\>

#### Defined in

[src/utils/fetchWithTimeout.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/utils/fetchWithTimeout.ts#L1)

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

[src/utils/headers.ts:7](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/utils/headers.ts#L7)
