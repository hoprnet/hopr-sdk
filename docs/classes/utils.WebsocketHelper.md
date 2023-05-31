# Class: WebsocketHelper

[utils](../modules/utils.md).WebsocketHelper

Helper class for managing a WebSocket connection.

## Table of contents

### Constructors

- [constructor](utils.WebsocketHelper.md#constructor)

### Properties

- [attemptToReconnect](utils.WebsocketHelper.md#attempttoreconnect)
- [connectionIsClosing](utils.WebsocketHelper.md#connectionisclosing)
- [maxReconnectAttempts](utils.WebsocketHelper.md#maxreconnectattempts)
- [maxTimeWithoutPing](utils.WebsocketHelper.md#maxtimewithoutping)
- [options](utils.WebsocketHelper.md#options)
- [pingTimeout](utils.WebsocketHelper.md#pingtimeout)
- [reconnectAttempts](utils.WebsocketHelper.md#reconnectattempts)
- [reconnectDelay](utils.WebsocketHelper.md#reconnectdelay)
- [reconnectTimeout](utils.WebsocketHelper.md#reconnecttimeout)
- [socket](utils.WebsocketHelper.md#socket)
- [url](utils.WebsocketHelper.md#url)
- [waitUntilSocketOpenP](utils.WebsocketHelper.md#waituntilsocketopenp)

### Methods

- [close](utils.WebsocketHelper.md#close)
- [closeInternal](utils.WebsocketHelper.md#closeinternal)
- [closeWithError](utils.WebsocketHelper.md#closewitherror)
- [handleError](utils.WebsocketHelper.md#handleerror)
- [handleMessage](utils.WebsocketHelper.md#handlemessage)
- [heartbeat](utils.WebsocketHelper.md#heartbeat)
- [setUpEventHandlers](utils.WebsocketHelper.md#setupeventhandlers)
- [shouldAttemptReconnect](utils.WebsocketHelper.md#shouldattemptreconnect)
- [wait](utils.WebsocketHelper.md#wait)
- [waitUntilSocketOpen](utils.WebsocketHelper.md#waituntilsocketopen)

## Constructors

### constructor

• **new WebsocketHelper**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `WebSocketHelperOptions` |

#### Defined in

[src/utils/ws-helper.ts:39](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L39)

## Properties

### attemptToReconnect

• `Private` **attemptToReconnect**: `boolean`

#### Defined in

[src/utils/ws-helper.ts:32](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L32)

___

### connectionIsClosing

• `Private` **connectionIsClosing**: `boolean` = `false`

#### Defined in

[src/utils/ws-helper.ts:26](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L26)

___

### maxReconnectAttempts

• `Private` **maxReconnectAttempts**: `number`

#### Defined in

[src/utils/ws-helper.ts:34](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L34)

___

### maxTimeWithoutPing

• `Private` **maxTimeWithoutPing**: `number`

#### Defined in

[src/utils/ws-helper.ts:31](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L31)

___

### options

• `Private` **options**: `WebSocketHelperOptions`

#### Defined in

[src/utils/ws-helper.ts:39](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L39)

___

### pingTimeout

• `Private` **pingTimeout**: `undefined` \| `Timeout`

#### Defined in

[src/utils/ws-helper.ts:29](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L29)

___

### reconnectAttempts

• `Private` **reconnectAttempts**: `number` = `0`

#### Defined in

[src/utils/ws-helper.ts:27](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L27)

___

### reconnectDelay

• `Private` **reconnectDelay**: `number`

#### Defined in

[src/utils/ws-helper.ts:33](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L33)

___

### reconnectTimeout

• `Private` **reconnectTimeout**: `undefined` \| `Timeout`

#### Defined in

[src/utils/ws-helper.ts:30](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L30)

___

### socket

• `Private` **socket**: `WebSocket`

#### Defined in

[src/utils/ws-helper.ts:28](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L28)

___

### url

• `Private` **url**: `string`

#### Defined in

[src/utils/ws-helper.ts:25](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L25)

___

### waitUntilSocketOpenP

• `Private` **waitUntilSocketOpenP**: [`DeferredPromise`](utils.DeferredPromise.md)<`WebSocket`\>

#### Defined in

[src/utils/ws-helper.ts:37](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L37)

## Methods

### close

▸ **close**(): `void`

We want to close the connection,
and not reconnect again.

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:80](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L80)

___

### closeInternal

▸ `Private` **closeInternal**(): `void`

Closes connection to the websocket server.

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:68](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L68)

___

### closeWithError

▸ `Private` **closeWithError**(`errorMessage`): `void`

Closes connection to the websocket server.

#### Parameters

| Name | Type |
| :------ | :------ |
| `errorMessage` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:90](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L90)

___

### handleError

▸ `Private` **handleError**(`error`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `ErrorEvent` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ws-helper.ts:172](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L172)

___

### handleMessage

▸ `Private` **handleMessage**(`event`): `void`

Handles an incoming message from the WebSocket server.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `MessageEvent` | The message event. |

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:139](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L139)

___

### heartbeat

▸ `Private` **heartbeat**(): `void`

Updates the heartbeat timeout.

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:99](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L99)

___

### setUpEventHandlers

▸ `Private` **setUpEventHandlers**(): `void`

Sets up event handlers for the WebSocket connection.

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:110](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L110)

___

### shouldAttemptReconnect

▸ `Private` **shouldAttemptReconnect**(`error`): `boolean`

Determines whether a reconnection attempt should be made after an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `ErrorEvent` | The error that occurred. |

#### Returns

`boolean`

True if a reconnection attempt should be made; false otherwise.

#### Defined in

[src/utils/ws-helper.ts:164](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L164)

___

### wait

▸ `Private` **wait**(`delay`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `delay` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/ws-helper.ts:210](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L210)

___

### waitUntilSocketOpen

▸ **waitUntilSocketOpen**(): `Promise`<`WebSocket`\>

Resolves if we have successfully opened a connection.
Reject if we didn't.

#### Returns

`Promise`<`WebSocket`\>

the websocket instance

#### Defined in

[src/utils/ws-helper.ts:56](https://github.com/hoprnet/hopr-sdk/blob/80a74a6/src/utils/ws-helper.ts#L56)
