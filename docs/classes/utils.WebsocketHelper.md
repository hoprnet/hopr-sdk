# Class: WebsocketHelper

[utils](../modules/utils.md).WebsocketHelper

Helper class for managing a WebSocket connection.

## Table of contents

### Constructors

- [constructor](utils.WebsocketHelper.md#constructor)

### Properties

- [apiEndpoint](utils.WebsocketHelper.md#apiendpoint)
- [apiToken](utils.WebsocketHelper.md#apitoken)
- [attemptToReconnect](utils.WebsocketHelper.md#attempttoreconnect)
- [connectionIsClosing](utils.WebsocketHelper.md#connectionisclosing)
- [maxReconnectAttempts](utils.WebsocketHelper.md#maxreconnectattempts)
- [maxTimeWithoutPing](utils.WebsocketHelper.md#maxtimewithoutping)
- [options](utils.WebsocketHelper.md#options)
- [path](utils.WebsocketHelper.md#path)
- [pingTimeout](utils.WebsocketHelper.md#pingtimeout)
- [reconnectAttempts](utils.WebsocketHelper.md#reconnectattempts)
- [reconnectDelay](utils.WebsocketHelper.md#reconnectdelay)
- [reconnectTimeout](utils.WebsocketHelper.md#reconnecttimeout)
- [socket](utils.WebsocketHelper.md#socket)
- [waitUntilSocketOpenP](utils.WebsocketHelper.md#waituntilsocketopenp)

### Methods

- [close](utils.WebsocketHelper.md#close)
- [closeInternal](utils.WebsocketHelper.md#closeinternal)
- [closeWithError](utils.WebsocketHelper.md#closewitherror)
- [handleError](utils.WebsocketHelper.md#handleerror)
- [handleMessage](utils.WebsocketHelper.md#handlemessage)
- [heartbeat](utils.WebsocketHelper.md#heartbeat)
- [isRunningOnBrowser](utils.WebsocketHelper.md#isrunningonbrowser)
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

[src/utils/ws-helper.ts:44](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L44)

## Properties

### apiEndpoint

• `Private` **apiEndpoint**: `string`

#### Defined in

[src/utils/ws-helper.ts:28](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L28)

___

### apiToken

• `Private` **apiToken**: `string`

#### Defined in

[src/utils/ws-helper.ts:29](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L29)

___

### attemptToReconnect

• `Private` **attemptToReconnect**: `boolean`

#### Defined in

[src/utils/ws-helper.ts:37](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L37)

___

### connectionIsClosing

• `Private` **connectionIsClosing**: `boolean` = `false`

#### Defined in

[src/utils/ws-helper.ts:31](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L31)

___

### maxReconnectAttempts

• `Private` **maxReconnectAttempts**: `number`

#### Defined in

[src/utils/ws-helper.ts:39](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L39)

___

### maxTimeWithoutPing

• `Private` **maxTimeWithoutPing**: `number`

#### Defined in

[src/utils/ws-helper.ts:36](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L36)

___

### options

• `Private` **options**: `WebSocketHelperOptions`

#### Defined in

[src/utils/ws-helper.ts:44](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L44)

___

### path

• `Private` **path**: `undefined` \| `string`

#### Defined in

[src/utils/ws-helper.ts:30](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L30)

___

### pingTimeout

• `Private` **pingTimeout**: `undefined` \| `Timeout`

#### Defined in

[src/utils/ws-helper.ts:34](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L34)

___

### reconnectAttempts

• `Private` **reconnectAttempts**: `number` = `0`

#### Defined in

[src/utils/ws-helper.ts:32](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L32)

___

### reconnectDelay

• `Private` **reconnectDelay**: `number`

#### Defined in

[src/utils/ws-helper.ts:38](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L38)

___

### reconnectTimeout

• `Private` **reconnectTimeout**: `undefined` \| `Timeout`

#### Defined in

[src/utils/ws-helper.ts:35](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L35)

___

### socket

• `Private` **socket**: `WebSocket`

#### Defined in

[src/utils/ws-helper.ts:33](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L33)

___

### waitUntilSocketOpenP

• `Private` **waitUntilSocketOpenP**: [`DeferredPromise`](utils.DeferredPromise.md)<`WebSocket`\>

#### Defined in

[src/utils/ws-helper.ts:42](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L42)

## Methods

### close

▸ **close**(): `void`

We want to close the connection,
and not reconnect again.

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:93](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L93)

___

### closeInternal

▸ `Private` **closeInternal**(): `void`

Closes connection to the websocket server.

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:81](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L81)

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

[src/utils/ws-helper.ts:103](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L103)

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

[src/utils/ws-helper.ts:184](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L184)

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

[src/utils/ws-helper.ts:166](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L166)

___

### heartbeat

▸ `Private` **heartbeat**(): `void`

Updates the heartbeat timeout.

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:117](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L117)

___

### isRunningOnBrowser

▸ `Private` **isRunningOnBrowser**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/utils/ws-helper.ts:109](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L109)

___

### setUpEventHandlers

▸ `Private` **setUpEventHandlers**(): `void`

Sets up event handlers for the WebSocket connection.

#### Returns

`void`

#### Defined in

[src/utils/ws-helper.ts:131](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L131)

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

[src/utils/ws-helper.ts:176](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L176)

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

[src/utils/ws-helper.ts:224](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L224)

___

### waitUntilSocketOpen

▸ **waitUntilSocketOpen**(): `Promise`<`WebSocket`\>

Resolves if we have successfully opened a connection.
Reject if we didn't.

#### Returns

`Promise`<`WebSocket`\>

the websocket instance

#### Defined in

[src/utils/ws-helper.ts:69](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/utils/ws-helper.ts#L69)
