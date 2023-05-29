# Class: APIError

[utils](../modules/utils.md).APIError

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

#### Parameters

| Name | Type |
| :------ | :------ |
| `customError` | `Object` |
| `customError.error?` | `string` |
| `customError.status?` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/utils/error.ts:7](https://github.com/hoprnet/hopr-sdk/blob/main/src/utils/error.ts#L7)

## Properties

### error

• `Optional` **error**: `string`

#### Defined in

[src/utils/error.ts:5](https://github.com/hoprnet/hopr-sdk/blob/main/src/utils/error.ts#L5)

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

• `Optional` **status**: `string`

#### Defined in

[src/utils/error.ts:4](https://github.com/hoprnet/hopr-sdk/blob/main/src/utils/error.ts#L4)

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
