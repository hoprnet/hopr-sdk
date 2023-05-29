[@hoprnet/hopr-sdk](../README.md) / [Exports](../modules.md) / api

# Namespace: api

## Table of contents

### Functions

- [closeChannel](api.md#closechannel)
- [createToken](api.md#createtoken)
- [deleteToken](api.md#deletetoken)
- [fundChannels](api.md#fundchannels)
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
- [getMetrics](api.md#getmetrics)
- [getNativeAddress](api.md#getnativeaddress)
- [getNativeBalance](api.md#getnativebalance)
- [getPeerInfo](api.md#getpeerinfo)
- [getPeers](api.md#getpeers)
- [getSettings](api.md#getsettings)
- [getStatistics](api.md#getstatistics)
- [getTickets](api.md#gettickets)
- [getToken](api.md#gettoken)
- [getVersion](api.md#getversion)
- [getWsUrl](api.md#getwsurl)
- [openChannel](api.md#openchannel)
- [pingNode](api.md#pingnode)
- [redeemChannelTickets](api.md#redeemchanneltickets)
- [redeemTickets](api.md#redeemtickets)
- [removeAlias](api.md#removealias)
- [sendMessage](api.md#sendmessage)
- [setAlias](api.md#setalias)
- [setSetting](api.md#setsetting)
- [sign](api.md#sign)
- [websocket](api.md#websocket)
- [withdraw](api.md#withdraw)

## Functions

### closeChannel

▸ **closeChannel**(`payload`): `Promise`<{ `channelStatus`: `string` ; `receipt?`: `string`  }\>

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
| `payload.direction` | ``"incoming"`` \| ``"outgoing"`` | - |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `channelStatus`: `string` ; `receipt?`: `string`  }\>

A Promise that resolves with the response of the close channel operation.

#### Defined in

[src/api/channels/closeChannel.ts:18](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/channels/closeChannel.ts#L18)

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
| `payload.capabilities` | { `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: { type: string; conditions?: { max?: number \| undefined; } \| undefined; used?: number \| undefined; }[]  }[] | - |
| `payload.description` | `string` | - |
| `payload.lifetime` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `token`: `string`  }\>

A Promise that resolves to the generated token which must be used when authenticating for API calls.

#### Defined in

[src/api/tokens/createToken.ts:24](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/tokens/createToken.ts#L24)

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

[src/api/tokens/deleteToken.ts:14](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/tokens/deleteToken.ts#L14)

___

### fundChannels

▸ **fundChannels**(`payload`): `Promise`<{ `receipt`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.incomingAmount` | `string` | - |
| `payload.outgoingAmount` | `string` | - |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `receipt`: `string`  }\>

#### Defined in

[src/api/channels/fundChannels.ts:10](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/channels/fundChannels.ts#L10)

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

[src/api/account/getAddresses.ts:17](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/account/getAddresses.ts#L17)

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

[src/api/aliases/getAlias.ts:13](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/aliases/getAlias.ts#L13)

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

[src/api/aliases/getAliases.ts:17](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/aliases/getAliases.ts#L17)

___

### getBalances

▸ **getBalances**(`payload`): `Promise`<{ `hopr`: `string` ; `native`: `string`  }\>

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

`Promise`<{ `hopr`: `string` ; `native`: `string`  }\>

A Promise that resolves with an object containing the HOPR and native balances.

#### Defined in

[src/api/account/getBalances.ts:17](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/account/getBalances.ts#L17)

___

### getChannel

▸ **getChannel**(`payload`): `Promise`<{ `balance`: `string` ; `channelId`: `string` ; `peerId`: `string` ; `status`: ``"WaitingForCommitment"`` \| ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` ; `type`: ``"incoming"`` \| ``"outgoing"``  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.direction` | ``"incoming"`` \| ``"outgoing"`` | - |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `balance`: `string` ; `channelId`: `string` ; `peerId`: `string` ; `status`: ``"WaitingForCommitment"`` \| ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` ; `type`: ``"incoming"`` \| ``"outgoing"``  }\>

#### Defined in

[src/api/channels/getChannel.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/channels/getChannel.ts#L9)

___

### getChannelTickets

▸ **getChannelTickets**(`payload`): `Promise`<{ `amount`: `string` ; `challenge`: `string` ; `channelEpoch`: `string` ; `counterparty`: `string` ; `epoch`: `string` ; `index`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `amount`: `string` ; `challenge`: `string` ; `channelEpoch`: `string` ; `counterparty`: `string` ; `epoch`: `string` ; `index`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Defined in

[src/api/channels/getChannelTickets.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/channels/getChannelTickets.ts#L9)

___

### getChannels

▸ **getChannels**(`payload`): `Promise`<{ `incoming`: { type: "incoming" \| "outgoing"; status: "WaitingForCommitment" \| "Open" \| "PendingToClose" \| "Closed"; peerId: string; channelId: string; balance: string; }[] ; `outgoing`: { type: "incoming" \| "outgoing"; status: "WaitingForCommitment" \| "Open" \| "PendingToClose" \| "Closed"; peerId: string; channelId: string; balance: string; }[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `incoming`: { type: "incoming" \| "outgoing"; status: "WaitingForCommitment" \| "Open" \| "PendingToClose" \| "Closed"; peerId: string; channelId: string; balance: string; }[] ; `outgoing`: { type: "incoming" \| "outgoing"; status: "WaitingForCommitment" \| "Open" \| "PendingToClose" \| "Closed"; peerId: string; channelId: string; balance: string; }[]  }\>

#### Defined in

[src/api/channels/getChannels.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/channels/getChannels.ts#L9)

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

[src/api/node/getEntryNodes.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/node/getEntryNodes.ts#L9)

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

[src/api/account/getHoprAddress.ts:13](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/account/getHoprAddress.ts#L13)

___

### getInfo

▸ **getInfo**(`payload`): `Promise`<{ `announcedAddress`: `string`[] ; `channelClosurePeriod`: `number` ; `connectivityStatus`: `string` ; `environment`: `string` ; `hoprChannels`: `string` ; `hoprNetworkRegistryAddress?`: `string` ; `hoprToken`: `string` ; `isEligible`: `boolean` ; `listeningAddress`: `string`[] ; `network`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `announcedAddress`: `string`[] ; `channelClosurePeriod`: `number` ; `connectivityStatus`: `string` ; `environment`: `string` ; `hoprChannels`: `string` ; `hoprNetworkRegistryAddress?`: `string` ; `hoprToken`: `string` ; `isEligible`: `boolean` ; `listeningAddress`: `string`[] ; `network`: `string`  }\>

#### Defined in

[src/api/node/getInfo.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/node/getInfo.ts#L9)

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

[src/api/node/getMetrics.ts:4](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/node/getMetrics.ts#L4)

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

[src/api/account/getNativeAddress.ts:12](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/account/getNativeAddress.ts#L12)

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

[src/api/account/getNativeBalance.ts:12](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/account/getNativeBalance.ts#L12)

___

### getPeerInfo

▸ **getPeerInfo**(`payload`): `Promise`<{ `announced`: `string`[] ; `observed`: `string`[]  }\>

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

[src/api/peerInfo/getPeerInfo.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/peerInfo/getPeerInfo.ts#L9)

___

### getPeers

▸ **getPeers**(`payload`): `Promise`<{ `announced`: { peerId: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; }[] ; `connected`: { peerId: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; }[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.quality?` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `announced`: { peerId: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; }[] ; `connected`: { peerId: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; }[]  }\>

#### Defined in

[src/api/node/getPeers.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/node/getPeers.ts#L9)

___

### getSettings

▸ **getSettings**(`payload`): `Promise`<{ `includeRecipient`: `boolean` ; `strategy`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `includeRecipient`: `boolean` ; `strategy`: `string`  }\>

#### Defined in

[src/api/settings/getSettings.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/settings/getSettings.ts#L9)

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

[src/api/tickets/getStatistics.ts:8](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/tickets/getStatistics.ts#L8)

___

### getTickets

▸ **getTickets**(`payload`): `Promise`<{ `amount`: `string` ; `challenge`: `string` ; `channelEpoch`: `string` ; `counterparty`: `string` ; `epoch`: `string` ; `index`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `amount`: `string` ; `challenge`: `string` ; `channelEpoch`: `string` ; `counterparty`: `string` ; `epoch`: `string` ; `index`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Defined in

[src/api/tickets/getTickets.ts:9](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/tickets/getTickets.ts#L9)

___

### getToken

▸ **getToken**(`payload`): `Promise`<{ `capabilities`: { endpoint: "accountWithdraw" \| "accountGetBalances" \| "accountGetAddresses" \| "aliasesGetAliases" \| "aliasesSetAlias" \| "aliasesGetAlias" \| "aliasesRemoveAlias" \| "channelsFundChannels" \| ... 23 more ... \| "tokensDelete"; limits: { ...; }[]; }[] ; `description?`: `string` ; `id`: `string` ; `valid_until?`: `number`  }\>

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

`Promise`<{ `capabilities`: { endpoint: "accountWithdraw" \| "accountGetBalances" \| "accountGetAddresses" \| "aliasesGetAliases" \| "aliasesSetAlias" \| "aliasesGetAlias" \| "aliasesRemoveAlias" \| "channelsFundChannels" \| ... 23 more ... \| "tokensDelete"; limits: { ...; }[]; }[] ; `description?`: `string` ; `id`: `string` ; `valid_until?`: `number`  }\>

A Promise that resolves to an object with the token info.

#### Defined in

[src/api/tokens/getToken.ts:17](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/tokens/getToken.ts#L17)

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

[src/api/node/getVersion.ts:4](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/node/getVersion.ts#L4)

___

### getWsUrl

▸ **getWsUrl**(`apiEndpoint`, `path`, `apiToken`): `string`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint to extract the ip and port |
| `path` | `string` | - |
| `apiToken` | `string` | - |

#### Returns

`string`

A string of the complete API endpoint.

#### Defined in

[src/api/messages/websocket.ts:25](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/messages/websocket.ts#L25)

___

### openChannel

▸ **openChannel**(`payload`): `Promise`<{ `channelId`: `string` ; `receipt`: `string`  }\>

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
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `channelId`: `string` ; `receipt`: `string`  }\>

A Promise that resolves with the response of the open channel operation.

#### Defined in

[src/api/channels/openChannel.ts:19](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/channels/openChannel.ts#L19)

___

### pingNode

▸ **pingNode**(`payload`): `Promise`<{ `latency`: `number`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `latency`: `number`  }\>

#### Defined in

[src/api/node/pingNode.ts:10](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/node/pingNode.ts#L10)

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
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`boolean`\>

A Promise that resolves to a boolean indicating the success of the operation.
True if the operation is successful, false otherwise.

#### Defined in

[src/api/channels/redeemChannelTickets.ts:15](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/channels/redeemChannelTickets.ts#L15)

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

[src/api/tickets/redeemTickets.ts:14](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/tickets/redeemTickets.ts#L14)

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

[src/api/aliases/removeAlias.ts:13](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/aliases/removeAlias.ts#L13)

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
| `payload.recipient` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

- A promise that resolves to the sent message.

#### Defined in

[src/api/messages/sendMessage.ts:20](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/messages/sendMessage.ts#L20)

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

[src/api/aliases/setAlias.ts:19](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/aliases/setAlias.ts#L19)

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

[src/api/settings/setSetting.ts:4](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/settings/setSetting.ts#L4)

___

### sign

▸ **sign**(`payload`): `Promise`<`string`\>

Signs a message given using the node’s private key. Prefixes messsage with “HOPR Signed Message: ” before signing.

**`Throws`**

An error that occurred while processing the request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.message` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

A Promise that resolves to a string representing the signature.

#### Defined in

[src/api/messages/sign.ts:18](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/messages/sign.ts#L18)

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

[src/api/messages/websocket.ts:11](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/messages/websocket.ts#L11)

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
| `payload.recipient` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`string`\>

A Promise that resolves to the transaction receipt.

#### Defined in

[src/api/account/withdraw.ts:16](https://github.com/hoprnet/hopr-sdk/blob/5642d04/src/api/account/withdraw.ts#L16)
