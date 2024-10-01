# Class: sdkApiError

[utils](../modules/utils.md).sdkApiError

Represents an HOPR SDK API error.

## Hierarchy

- `Error`

  ↳ **`sdkApiError`**

## Table of contents

### Constructors

- [constructor](utils.sdkApiError.md#constructor)

### Properties

- [description](utils.sdkApiError.md#description)
- [hoprdErrorPayload](utils.sdkApiError.md#hoprderrorpayload)
- [message](utils.sdkApiError.md#message)
- [name](utils.sdkApiError.md#name)
- [stack](utils.sdkApiError.md#stack)
- [status](utils.sdkApiError.md#status)
- [statusText](utils.sdkApiError.md#statustext)
- [prepareStackTrace](utils.sdkApiError.md#preparestacktrace)
- [stackTraceLimit](utils.sdkApiError.md#stacktracelimit)

### Methods

- [captureStackTrace](utils.sdkApiError.md#capturestacktrace)

## Constructors

### constructor

• **new sdkApiError**(`customError`): [`sdkApiError`](utils.sdkApiError.md)

Creates a new instance of the APIError class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customError` | `Object` | An object containing custom error properties. |
| `customError.description?` | `string` | - |
| `customError.hoprdErrorPayload?` | `Object` | - |
| `customError.hoprdErrorPayload.error?` | `string` | - |
| `customError.hoprdErrorPayload.status` | `string` | - |
| `customError.status` | `number` | - |
| `customError.statusText` | `string` | - |

#### Returns

[`sdkApiError`](utils.sdkApiError.md)

#### Overrides

Error.constructor

#### Defined in

[src/utils/sdkApiError.ts:41](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/utils/sdkApiError.ts#L41)

## Properties

### description

• `Optional` **description**: `string`

Descriton of the error

#### Defined in

[src/utils/sdkApiError.ts:35](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/utils/sdkApiError.ts#L35)

___

### hoprdErrorPayload

• `Optional` **hoprdErrorPayload**: `Object`

Error Object

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `string` |
| `status` | `string` |

#### Defined in

[src/utils/sdkApiError.ts:30](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/utils/sdkApiError.ts#L30)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1077

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1076

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1078

___

### status

• **status**: `number`

The status code associated with the error

#### Defined in

[src/utils/sdkApiError.ts:20](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/utils/sdkApiError.ts#L20)

___

### statusText

• **statusText**: `string`

The status message associated with the error.

#### Defined in

[src/utils/sdkApiError.ts:25](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/utils/sdkApiError.ts#L25)

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration

▸ (`err`, `stackTraces`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:28

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace

▸ **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:21
