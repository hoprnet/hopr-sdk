# Class: APIError

[utils](../modules/utils.md).APIError

Represents an HOPR API error.

## Hierarchy

- `Error`

  ↳ **`APIError`**

## Table of contents

### Constructors

- [constructor](utils.APIError.md#constructor)

### Properties

- [error](utils.APIError.md#error)
- [message](utils.APIError.md#message)
- [name](utils.APIError.md#name)
- [stack](utils.APIError.md#stack)
- [status](utils.APIError.md#status)
- [prepareStackTrace](utils.APIError.md#preparestacktrace)
- [stackTraceLimit](utils.APIError.md#stacktracelimit)

### Methods

- [captureStackTrace](utils.APIError.md#capturestacktrace)

## Constructors

### constructor

• **new APIError**(`customError`)

Creates a new instance of the APIError class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customError` | `Object` | An object containing custom error properties. |
| `customError.error?` | `string` | - |
| `customError.status` | `string` | - |

#### Overrides

Error.constructor

#### Defined in

[src/utils/error.ts:21](https://github.com/hoprnet/hopr-sdk/blob/118e28b/src/utils/error.ts#L21)

## Properties

### error

• `Optional` **error**: `string`

The error message.

#### Defined in

[src/utils/error.ts:15](https://github.com/hoprnet/hopr-sdk/blob/118e28b/src/utils/error.ts#L15)

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1055

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1054

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1056

___

### status

• **status**: `string`

The status message associated with the error.

#### Defined in

[src/utils/error.ts:10](https://github.com/hoprnet/hopr-sdk/blob/118e28b/src/utils/error.ts#L10)

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

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

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

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

node_modules/@types/node/globals.d.ts:4
