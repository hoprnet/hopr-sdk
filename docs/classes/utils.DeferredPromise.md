# Class: DeferredPromise<T\>

[utils](../modules/utils.md).DeferredPromise

Creates an instance of a deferred promise.

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Constructors

- [constructor](utils.DeferredPromise.md#constructor)

### Properties

- [promise](utils.DeferredPromise.md#promise)
- [reject](utils.DeferredPromise.md#reject)
- [resolve](utils.DeferredPromise.md#resolve)

## Constructors

### constructor

• **new DeferredPromise**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/utils/deferredPromise.ts:9](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/deferredPromise.ts#L9)

## Properties

### promise

• **promise**: `Promise`<`T`\>

#### Defined in

[src/utils/deferredPromise.ts:5](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/deferredPromise.ts#L5)

___

### reject

• **reject**: (`reason?`: `any`) => `void`

#### Type declaration

▸ (`reason?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `reason?` | `any` |

##### Returns

`void`

#### Defined in

[src/utils/deferredPromise.ts:7](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/deferredPromise.ts#L7)

___

### resolve

• **resolve**: (`value`: `T` \| `PromiseLike`<`T`\>) => `void`

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` \| `PromiseLike`<`T`\> |

##### Returns

`void`

#### Defined in

[src/utils/deferredPromise.ts:6](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/deferredPromise.ts#L6)
