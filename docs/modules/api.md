# Namespace: api

## Table of contents

### Functions

- [closeChannel](api.md#closechannel)
- [createToken](api.md#createtoken)
- [deleteMessages](api.md#deletemessages)
- [deleteToken](api.md#deletetoken)
- [getAddresses](api.md#getaddresses)
- [getAlias](api.md#getalias)
- [getAliases](api.md#getaliases)
- [getBalances](api.md#getbalances)
- [getChannel](api.md#getchannel)
- [getChannelTickets](api.md#getchanneltickets)
- [getChannels](api.md#getchannels)
- [getEntryNodes](api.md#getentrynodes)
- [getHoprAddress](api.md#gethopraddress)
- [getInfo](api.md#getinfo)
- [getMessagesSize](api.md#getmessagessize)
- [getMetrics](api.md#getmetrics)
- [getNativeAddress](api.md#getnativeaddress)
- [getNativeBalance](api.md#getnativebalance)
- [getPeer](api.md#getpeer)
- [getPeers](api.md#getpeers)
- [getSettings](api.md#getsettings)
- [getStatistics](api.md#getstatistics)
- [getTickets](api.md#gettickets)
- [getToken](api.md#gettoken)
- [getVersion](api.md#getversion)
- [openChannel](api.md#openchannel)
- [pingPeer](api.md#pingpeer)
- [popAllMessages](api.md#popallmessages)
- [popMessage](api.md#popmessage)
- [redeemChannelTickets](api.md#redeemchanneltickets)
- [redeemTickets](api.md#redeemtickets)
- [removeAlias](api.md#removealias)
- [sendMessage](api.md#sendmessage)
- [setAlias](api.md#setalias)
- [setSetting](api.md#setsetting)
- [websocket](api.md#websocket)
- [withdraw](api.md#withdraw)

## Functions

### closeChannel

▸ **closeChannel**(`payload`): `Promise`<{ `channelStatus`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `receipt`: `string`  }\>

Closes a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId and the direction of the channel.

This operation may take more than 5 minutes to complete as it involves on-chain operations.

**`Throws`**

APIError - If the operation fails. The error object contains the status code and the error message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `channelStatus`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `receipt`: `string`  }\>

A Promise that resolves with the response of the close channel operation.

#### Defined in

[src/api/channels/closeChannel.ts:19](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/channels/closeChannel.ts#L19)

___

### createToken

▸ **createToken**(`payload`): `Promise`<{ `token`: `string`  }\>

Create a new authentication token based on the given information.
The new token is returned as part of the response body and must be stored by the client.
It cannot be read again in cleartext and is lost, if the client loses the token.
An authentication has a lifetime. It can be unbound, meaning it will not expire.
Or it has a limited lifetime after which it expires.
The requested limited lifetime is requested by the client in seconds.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.capabilities` | { `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: { type: string; conditions?: { max?: number \| undefined; } \| undefined; }[]  }[] | - |
| `payload.description` | `string` | - |
| `payload.lifetime` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `token`: `string`  }\>

A Promise that resolves to the generated token which must be used when authenticating for API calls.

#### Defined in

[src/api/tokens/createToken.ts:22](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/tokens/createToken.ts#L22)

___

### deleteMessages

▸ **deleteMessages**(`payload`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/messages/deleteMessages.ts:5](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/messages/deleteMessages.ts#L5)

___

### deleteToken

▸ **deleteToken**(`payload`): `Promise`<`boolean`\>

Deletes a token. Can only be done before the lifetime expired.
After the lifetime expired the token is automatically deleted.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.id` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to true if successful.

#### Defined in

[src/api/tokens/deleteToken.ts:15](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/tokens/deleteToken.ts#L15)

___

### getAddresses

▸ **getAddresses**(`payload`): `Promise`<{ `hopr`: `string` ; `native`: `string`  }\>

Gets the HOPR and native addresses associated to the node.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `hopr`: `string` ; `native`: `string`  }\>

A promise that resolves with an object containing the HOPR and native addresses.

#### Defined in

[src/api/account/getAddresses.ts:18](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/account/getAddresses.ts#L18)

___

### getAlias

▸ **getAlias**(`payload`): `Promise`<`string`\>

Get the PeerId (Hopr address) that have this alias assigned to it.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.alias` | `string` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

A promise that resolves to the peer ID associated with the alias.

#### Defined in

[src/api/aliases/getAlias.ts:18](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/aliases/getAlias.ts#L18)

___

### getAliases

▸ **getAliases**(`payload`): `Promise`<`Record`<`string`, `string`\>\>

Get all aliases you set previously and their corresponding peer IDs.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`Record`<`string`, `string`\>\>

An object with alias names as keys and the peerId associated with the alias.

#### Defined in

[src/api/aliases/getAliases.ts:18](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/aliases/getAliases.ts#L18)

___

### getBalances

▸ **getBalances**(`payload`): `Promise`<{ `hopr`: `string` ; `native`: `string` ; `safeHopr`: `string` ; `safeHoprAllowance`: `string` ; `safeNative`: `string`  }\>

Fetches the HOPR and native balances of the node.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `hopr`: `string` ; `native`: `string` ; `safeHopr`: `string` ; `safeHoprAllowance`: `string` ; `safeNative`: `string`  }\>

A Promise that resolves with an object containing the HOPR and native balances.

#### Defined in

[src/api/account/getBalances.ts:18](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/account/getBalances.ts#L18)

___

### getChannel

▸ **getChannel**(`payload`): `Promise`<{ `balance`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `closureTime`: `string` ; `destinationAddress`: `string` ; `destinationPeerId`: `string` ; `sourceAddress`: `string` ; `sourcePeerId`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `ticketIndex`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `balance`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `closureTime`: `string` ; `destinationAddress`: `string` ; `destinationPeerId`: `string` ; `sourceAddress`: `string` ; `sourcePeerId`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `ticketIndex`: `string`  }\>

#### Defined in

[src/api/channels/getChannel.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/channels/getChannel.ts#L10)

___

### getChannelTickets

▸ **getChannelTickets**(`payload`): `Promise`<{ `amount`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `index`: `string` ; `indexOffset`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `amount`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `index`: `string` ; `indexOffset`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Defined in

[src/api/channels/getChannelTickets.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/channels/getChannelTickets.ts#L10)

___

### getChannels

▸ **getChannels**(`payload`): `Promise`<{ `all`: { status: "Open" \| "PendingToClose" \| "Closed"; channelId: string; sourcePeerId: string; destinationPeerId: string; sourceAddress: string; destinationAddress: string; balance: string; ticketIndex: string; channelEpoch: string; closureTime: string; }[] ; `incoming`: { type: "incoming" \| "outgoing"; status: "Open" \| "PendingToClose" \| "Closed"; balance: string; id: string; peerAddress: string; }[] ; `outgoing`: { type: "incoming" \| "outgoing"; status: "Open" \| "PendingToClose" \| "Closed"; balance: string; id: string; peerAddress: string; }[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.fullTopology?` | `boolean` | - |
| `payload.includingClosed?` | `boolean` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `all`: { status: "Open" \| "PendingToClose" \| "Closed"; channelId: string; sourcePeerId: string; destinationPeerId: string; sourceAddress: string; destinationAddress: string; balance: string; ticketIndex: string; channelEpoch: string; closureTime: string; }[] ; `incoming`: { type: "incoming" \| "outgoing"; status: "Open" \| "PendingToClose" \| "Closed"; balance: string; id: string; peerAddress: string; }[] ; `outgoing`: { type: "incoming" \| "outgoing"; status: "Open" \| "PendingToClose" \| "Closed"; balance: string; id: string; peerAddress: string; }[]  }\>

#### Defined in

[src/api/channels/getChannels.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/channels/getChannels.ts#L10)

___

### getEntryNodes

▸ **getEntryNodes**(`payload`): `Promise`<`Record`<`string`, { `isEligible`: `boolean` ; `multiaddrs`: `string`[]  }\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`Record`<`string`, { `isEligible`: `boolean` ; `multiaddrs`: `string`[]  }\>\>

#### Defined in

[src/api/node/getEntryNodes.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/node/getEntryNodes.ts#L10)

___

### getHoprAddress

▸ **getHoprAddress**(`payload`): `Promise`<`string`\>

Get the HOPR address of the node.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

A Promise that resolves to the HOPR address.

#### Defined in

[src/api/account/getHoprAddress.ts:12](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/account/getHoprAddress.ts#L12)

___

### getInfo

▸ **getInfo**(`payload`): `Promise`<{ `announcedAddress`: `string`[] ; `chain`: `string` ; `channelClosurePeriod`: `number` ; `connectivityStatus`: `string` ; `hoprChannels`: `string` ; `hoprNetworkRegistryAddress?`: `string` ; `hoprNodeSafeRegistryAddress?`: `string` ; `hoprToken`: `string` ; `isEligible`: `boolean` ; `listeningAddress`: `string`[] ; `network`: `string` ; `nodeManagementModule`: `string` ; `nodeSafe`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `announcedAddress`: `string`[] ; `chain`: `string` ; `channelClosurePeriod`: `number` ; `connectivityStatus`: `string` ; `hoprChannels`: `string` ; `hoprNetworkRegistryAddress?`: `string` ; `hoprNodeSafeRegistryAddress?`: `string` ; `hoprToken`: `string` ; `isEligible`: `boolean` ; `listeningAddress`: `string`[] ; `network`: `string` ; `nodeManagementModule`: `string` ; `nodeSafe`: `string`  }\>

#### Defined in

[src/api/node/getInfo.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/node/getInfo.ts#L10)

___

### getMessagesSize

▸ **getMessagesSize**(`payload`): `Promise`<{ `size`: `number`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `size`: `number`  }\>

#### Defined in

[src/api/messages/getMessagesSize.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/messages/getMessagesSize.ts#L10)

___

### getMetrics

▸ **getMetrics**(`payload`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api/node/getMetrics.ts:5](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/node/getMetrics.ts#L5)

___

### getNativeAddress

▸ **getNativeAddress**(`payload`): `Promise`<`string`\>

Get the native address of the node.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

A Promise that resolves to the native address.

#### Defined in

[src/api/account/getNativeAddress.ts:12](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/account/getNativeAddress.ts#L12)

___

### getNativeBalance

▸ **getNativeBalance**(`payload`): `Promise`<`string`\>

Get the native balance of the node.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

A Promise that resolves with a string representing the native balance.

#### Defined in

[src/api/account/getNativeBalance.ts:12](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/account/getNativeBalance.ts#L12)

___

### getPeer

▸ **getPeer**(`payload`): `Promise`<{ `announced`: `string`[] ; `observed`: `string`[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `announced`: `string`[] ; `observed`: `string`[]  }\>

#### Defined in

[src/api/peerInfo/getPeer.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/peerInfo/getPeer.ts#L10)

___

### getPeers

▸ **getPeers**(`payload`): `Promise`<{ `announced`: { peerId: string; peerAddress: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; reportedVersion: string; }[] ; `connected`: { peerId: string; peerAddress: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; reportedVersion: string; }[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.quality?` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `announced`: { peerId: string; peerAddress: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; reportedVersion: string; }[] ; `connected`: { peerId: string; peerAddress: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; reportedVersion: string; }[]  }\>

#### Defined in

[src/api/node/getPeers.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/node/getPeers.ts#L10)

___

### getSettings

▸ **getSettings**(`payload`): `Promise`<{ `includeRecipient`: `boolean`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `includeRecipient`: `boolean`  }\>

#### Defined in

[src/api/settings/getSettings.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/settings/getSettings.ts#L10)

___

### getStatistics

▸ **getStatistics**(`payload`): `Promise`<{ `losingTickets`: `number` ; `neglected`: `number` ; `pending`: `number` ; `redeemed`: `number` ; `redeemedValue`: `string` ; `rejected`: `number` ; `rejectedValue`: `string` ; `unredeemed`: `number` ; `unredeemedValue`: `string` ; `winProportion`: `number`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `losingTickets`: `number` ; `neglected`: `number` ; `pending`: `number` ; `redeemed`: `number` ; `redeemedValue`: `string` ; `rejected`: `number` ; `rejectedValue`: `string` ; `unredeemed`: `number` ; `unredeemedValue`: `string` ; `winProportion`: `number`  }\>

#### Defined in

[src/api/tickets/getStatistics.ts:9](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/tickets/getStatistics.ts#L9)

___

### getTickets

▸ **getTickets**(`payload`): `Promise`<{ `amount`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `index`: `string` ; `indexOffset`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `amount`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `index`: `string` ; `indexOffset`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Defined in

[src/api/tickets/getTickets.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/tickets/getTickets.ts#L10)

___

### getToken

▸ **getToken**(`payload`): `Promise`<{ `capabilities`: { endpoint: "accountWithdraw" \| "accountGetBalances" \| "accountGetAddresses" \| "aliasesGetAliases" \| "aliasesSetAlias" \| "aliasesGetAlias" \| "aliasesRemoveAlias" \| "channelsFundChannels" \| ... 24 more ... \| "tokensDelete"; limits: { ...; }[]; }[] ; `description?`: `string` ; `id`: `string` ; `valid_until?`: `number`  }\>

Get the full token information for the token used in authentication.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `capabilities`: { endpoint: "accountWithdraw" \| "accountGetBalances" \| "accountGetAddresses" \| "aliasesGetAliases" \| "aliasesSetAlias" \| "aliasesGetAlias" \| "aliasesRemoveAlias" \| "channelsFundChannels" \| ... 24 more ... \| "tokensDelete"; limits: { ...; }[]; }[] ; `description?`: `string` ; `id`: `string` ; `valid_until?`: `number`  }\>

A Promise that resolves to an object with the token info.

#### Defined in

[src/api/tokens/getToken.ts:18](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/tokens/getToken.ts#L18)

___

### getVersion

▸ **getVersion**(`payload`): `Promise`<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/api/node/getVersion.ts:5](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/node/getVersion.ts#L5)

___

### openChannel

▸ **openChannel**(`payload`): `Promise`<{ `channelId`: `string` ; `transactionReceipt`: `string`  }\>

Opens a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId, and the amount of HOPR tokens to be staked in the channel.

This operation may take more than 5 minutes to complete as it involves on-chain operations.

**`Throws`**

APIError - If the operation fails. The error object contains the status code and the error message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.amount` | `string` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerAddress` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `channelId`: `string` ; `transactionReceipt`: `string`  }\>

A Promise that resolves with the response of the open channel operation.

#### Defined in

[src/api/channels/openChannel.ts:20](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/channels/openChannel.ts#L20)

___

### pingPeer

▸ **pingPeer**(`payload`): `Promise`<{ `latency`: `number` ; `reportedVersion`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `latency`: `number` ; `reportedVersion`: `string`  }\>

#### Defined in

[src/api/peers/pingPeer.ts:10](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/peers/pingPeer.ts#L10)

___

### popAllMessages

▸ **popAllMessages**(`payload`): `Promise`<{ `messages`: { tag: number; body: string; }[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `messages`: { tag: number; body: string; }[]  }\>

#### Defined in

[src/api/messages/popAllMessages.ts:12](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/messages/popAllMessages.ts#L12)

___

### popMessage

▸ **popMessage**(`payload`): `Promise`<{ `body`: `string` ; `tag`: `number`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `body`: `string` ; `tag`: `number`  }\>

#### Defined in

[src/api/messages/popMessage.ts:11](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/messages/popMessage.ts#L11)

___

### redeemChannelTickets

▸ **redeemChannelTickets**(`payload`): `Promise`<`boolean`\>

Redeems all the unredeemed HOPR tickets in a channel.

This operation may take more than 5 minutes to complete as it involves on-chain operations.

**`Throws`**

APIError - If the operation fails. The error object contains the status code and the error message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to a boolean indicating the success of the operation.
True if the operation is successful, false otherwise.

#### Defined in

[src/api/channels/redeemChannelTickets.ts:19](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/channels/redeemChannelTickets.ts#L19)

___

### redeemTickets

▸ **redeemTickets**(`payload`): `Promise`<`boolean`\>

Redeems all the unredeemed HOPR tickets owned by the HOPR node.

This operation may take more than 5 minutes to complete as it involves on-chain operations.

**`Throws`**

APIError - If the operation fails. The error object contains the status code and the error message.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to a boolean indicating the success of the operation.
True if the operation is successful, false otherwise.

#### Defined in

[src/api/tickets/redeemTickets.ts:15](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/tickets/redeemTickets.ts#L15)

___

### removeAlias

▸ **removeAlias**(`payload`): `Promise`<`boolean`\>

Unassign an alias from a PeerId.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.alias` | `string` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to true if the alias was successfully removed.

#### Defined in

[src/api/aliases/removeAlias.ts:14](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/aliases/removeAlias.ts#L14)

___

### sendMessage

▸ **sendMessage**(`payload`): `Promise`<`string`\>

Send a message to another peer using a given path (list of node addresses that should relay our message through network). If no path is given, HOPR will attempt to find a path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.body` | `string` | - |
| `payload.hops?` | `number` | - |
| `payload.path?` | `string`[] | - |
| `payload.peerId` | `string` | - |
| `payload.tag` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

- A promise that resolves to the sent message.

#### Defined in

[src/api/messages/sendMessage.ts:13](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/messages/sendMessage.ts#L13)

___

### setAlias

▸ **setAlias**(`payload`): `Promise`<`boolean`\>

Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
Give an address a more memorable alias and use it instead of Hopr address.
Aliases are kept locally and are not saved or shared on the network.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.alias` | `string` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to true if alias successfully linked to peerId.

#### Defined in

[src/api/aliases/setAlias.ts:20](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/aliases/setAlias.ts#L20)

___

### setSetting

▸ **setSetting**(`payload`): `Promise`<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.setting` | `string` | - |
| `payload.settingValue?` | `any` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/api/settings/setSetting.ts:5](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/settings/setSetting.ts#L5)

___

### websocket

▸ **websocket**(`payload`): `WebSocket`

Creates a WebSocket instance with the specified IP and API token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`WebSocket`

A WebSocket instance.

#### Defined in

[src/api/messages/websocket.ts:13](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/messages/websocket.ts#L13)

___

### withdraw

▸ **withdraw**(`payload`): `Promise`<`string`\>

Withdraw the given currency amount to the specified recipient address.
This operation may take more than 5 minutes to complete as it involves on-chain operations.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.amount` | `string` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.currency` | ``"NATIVE"`` \| ``"HOPR"`` | - |
| `payload.ethereumAddress` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

A Promise that resolves to the transaction receipt.

#### Defined in

[src/api/account/withdraw.ts:17](https://github.com/hoprnet/hopr-sdk/blob/16280af/src/api/account/withdraw.ts#L17)
