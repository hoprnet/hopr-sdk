# Namespace: api

## Table of contents

### Functions

- [closeChannel](api.md#closechannel)
- [createToken](api.md#createtoken)
- [deleteMessages](api.md#deletemessages)
- [deleteToken](api.md#deletetoken)
- [fundChannel](api.md#fundchannel)
- [getAddresses](api.md#getaddresses)
- [getAlias](api.md#getalias)
- [getAliases](api.md#getaliases)
- [getBalances](api.md#getbalances)
- [getChannel](api.md#getchannel)
- [getChannelTickets](api.md#getchanneltickets)
- [getChannels](api.md#getchannels)
- [getConfiguration](api.md#getconfiguration)
- [getEntryNodes](api.md#getentrynodes)
- [getHoprAddress](api.md#gethopraddress)
- [getInfo](api.md#getinfo)
- [getMessagesSize](api.md#getmessagessize)
- [getMetrics](api.md#getmetrics)
- [getNativeAddress](api.md#getnativeaddress)
- [getNativeBalance](api.md#getnativebalance)
- [getPeer](api.md#getpeer)
- [getPeers](api.md#getpeers)
- [getTicketPrice](api.md#getticketprice)
- [getTicketStatistics](api.md#getticketstatistics)
- [getToken](api.md#gettoken)
- [getVersion](api.md#getversion)
- [isNodeHealthy](api.md#isnodehealthy)
- [isNodeReady](api.md#isnodeready)
- [isNodeStarted](api.md#isnodestarted)
- [openChannel](api.md#openchannel)
- [peekAllMessages](api.md#peekallmessages)
- [peekMessage](api.md#peekmessage)
- [pingPeer](api.md#pingpeer)
- [popAllMessages](api.md#popallmessages)
- [popMessage](api.md#popmessage)
- [redeemChannelTickets](api.md#redeemchanneltickets)
- [redeemTickets](api.md#redeemtickets)
- [removeAlias](api.md#removealias)
- [sendMessage](api.md#sendmessage)
- [setAlias](api.md#setalias)
- [websocket](api.md#websocket)
- [withdraw](api.md#withdraw)

## Functions

### closeChannel

▸ **closeChannel**(`payload`): `Promise`\<\{ `channelStatus`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `receipt`: `string`  }\>

Closes a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId and the direction of the channel.

This operation may take more than 5 minutes to complete as it involves on-chain operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `channelStatus`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `receipt`: `string`  }\>

A Promise that resolves with the response of the close channel operation.

**`Throws`**

APIError - If the operation fails. The error object contains the status code and the error message.

#### Defined in

[src/api/channels/closeChannel.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/channels/closeChannel.ts#L18)

___

### createToken

▸ **createToken**(`payload`): `Promise`\<\{ `token`: `string`  }\>

Create a new authentication token based on the given information.
The new token is returned as part of the response body and must be stored by the client.
It cannot be read again in cleartext and is lost, if the client loses the token.
An authentication has a lifetime. It can be unbound, meaning it will not expire.
Or it has a limited lifetime after which it expires.
The requested limited lifetime is requested by the client in seconds.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.capabilities` | \{ `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }[]  }[] | - |
| `payload.description` | `string` | - |
| `payload.lifetime` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `token`: `string`  }\>

A Promise that resolves to the generated token which must be used when authenticating for API calls.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/tokens/createToken.ts:22](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/tokens/createToken.ts#L22)

___

### deleteMessages

▸ **deleteMessages**(`payload`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag?` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[src/api/messages/deleteMessages.ts:5](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/messages/deleteMessages.ts#L5)

___

### deleteToken

▸ **deleteToken**(`payload`): `Promise`\<`boolean`\>

Deletes a token. Can only be done before the lifetime expired.
After the lifetime expired the token is automatically deleted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.id` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if successful.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/tokens/deleteToken.ts:15](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/tokens/deleteToken.ts#L15)

___

### fundChannel

▸ **fundChannel**(`payload`): `Promise`\<\{ `receipt`: `string`  }\>

Funds an existing channel with the given amount. The channel must be in state OPEN

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.amount` | `string` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `receipt`: `string`  }\>

#### Defined in

[src/api/channels/fundChannel.ts:14](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/channels/fundChannel.ts#L14)

___

### getAddresses

▸ **getAddresses**(`payload`): `Promise`\<\{ `hopr`: `string` ; `native`: `string`  }\>

Gets the HOPR and native addresses associated to the node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `hopr`: `string` ; `native`: `string`  }\>

A promise that resolves with an object containing the HOPR and native addresses.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/account/getAddresses.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/account/getAddresses.ts#L18)

___

### getAlias

▸ **getAlias**(`payload`): `Promise`\<`string`\>

Get the PeerId (Hopr address) that have this alias assigned to it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.alias` | `string` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`string`\>

A promise that resolves to the peer ID associated with the alias.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/aliases/getAlias.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/aliases/getAlias.ts#L18)

___

### getAliases

▸ **getAliases**(`payload`): `Promise`\<`Record`\<`string`, `string`\>\>

Get all aliases you set previously and their corresponding peer IDs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`Record`\<`string`, `string`\>\>

An object with alias names as keys and the peerId associated with the alias.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/aliases/getAliases.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/aliases/getAliases.ts#L18)

___

### getBalances

▸ **getBalances**(`payload`): `Promise`\<\{ `hopr`: `string` ; `native`: `string` ; `safeHopr`: `string` ; `safeHoprAllowance`: `string` ; `safeNative`: `string`  }\>

Fetches the HOPR and native balances of the node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `hopr`: `string` ; `native`: `string` ; `safeHopr`: `string` ; `safeHoprAllowance`: `string` ; `safeNative`: `string`  }\>

A Promise that resolves with an object containing the HOPR and native balances.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/account/getBalances.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/account/getBalances.ts#L18)

___

### getChannel

▸ **getChannel**(`payload`): `Promise`\<\{ `balance`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `closureTime`: `number` ; `destinationAddress`: `string` ; `destinationPeerId`: `string` ; `sourceAddress`: `string` ; `sourcePeerId`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `ticketIndex`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `balance`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `closureTime`: `number` ; `destinationAddress`: `string` ; `destinationPeerId`: `string` ; `sourceAddress`: `string` ; `sourcePeerId`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `ticketIndex`: `string`  }\>

#### Defined in

[src/api/channels/getChannel.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/channels/getChannel.ts#L10)

___

### getChannelTickets

▸ **getChannelTickets**(`payload`): `Promise`\<\{ `amount`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `index`: `number` ; `indexOffset`: `number` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `amount`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `index`: `number` ; `indexOffset`: `number` ; `signature`: `string` ; `winProb`: `string`  }[]\>

#### Defined in

[src/api/channels/getChannelTickets.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/channels/getChannelTickets.ts#L10)

___

### getChannels

▸ **getChannels**(`payload`): `Promise`\<\{ `all`: \{ `balance`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `closureTime`: `number` ; `destinationAddress`: `string` ; `destinationPeerId`: `string` ; `sourceAddress`: `string` ; `sourcePeerId`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `ticketIndex`: `string`  }[] ; `incoming`: \{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus }[] ; `outgoing`: \{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus }[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.fullTopology?` | `boolean` | - |
| `payload.includingClosed?` | `boolean` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `all`: \{ `balance`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `closureTime`: `number` ; `destinationAddress`: `string` ; `destinationPeerId`: `string` ; `sourceAddress`: `string` ; `sourcePeerId`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `ticketIndex`: `string`  }[] ; `incoming`: \{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus }[] ; `outgoing`: \{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus }[]  }\>

#### Defined in

[src/api/channels/getChannels.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/channels/getChannels.ts#L10)

___

### getConfiguration

▸ **getConfiguration**(`payload`): `Promise`\<`any`\>

Get the configuration of your node.
Configuration is not type safe

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`any`\>

An object with configuration of your node.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/configuration/getConfiguration.ts:19](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/configuration/getConfiguration.ts#L19)

___

### getEntryNodes

▸ **getEntryNodes**(`payload`): `Promise`\<`Record`\<`string`, \{ `isEligible`: `boolean` ; `multiaddrs`: `string`[]  }\>\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`Record`\<`string`, \{ `isEligible`: `boolean` ; `multiaddrs`: `string`[]  }\>\>

#### Defined in

[src/api/node/getEntryNodes.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/node/getEntryNodes.ts#L10)

___

### getHoprAddress

▸ **getHoprAddress**(`payload`): `Promise`\<`string`\>

Get the HOPR address of the node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`string`\>

A Promise that resolves to the HOPR address.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/account/getHoprAddress.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/account/getHoprAddress.ts#L12)

___

### getInfo

▸ **getInfo**(`payload`): `Promise`\<\{ `announcedAddress`: `string`[] ; `chain`: `string` ; `channelClosurePeriod`: `number` ; `connectivityStatus`: ``"Unknown"`` \| ``"Red"`` \| ``"Orange"`` \| ``"Yellow"`` \| ``"Green"`` ; `hoprChannels`: `string` ; `hoprManagementModule`: `string` ; `hoprNetworkRegistry?`: `string` ; `hoprNodeSafe`: `string` ; `hoprNodeSafeRegistry?`: `string` ; `hoprToken`: `string` ; `indexBlockPrevChecksum?`: `number` ; `indexerBlock?`: `number` ; `indexerChecksum?`: `string` ; `isEligible`: `boolean` ; `listeningAddress`: `string`[] ; `network`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `announcedAddress`: `string`[] ; `chain`: `string` ; `channelClosurePeriod`: `number` ; `connectivityStatus`: ``"Unknown"`` \| ``"Red"`` \| ``"Orange"`` \| ``"Yellow"`` \| ``"Green"`` ; `hoprChannels`: `string` ; `hoprManagementModule`: `string` ; `hoprNetworkRegistry?`: `string` ; `hoprNodeSafe`: `string` ; `hoprNodeSafeRegistry?`: `string` ; `hoprToken`: `string` ; `indexBlockPrevChecksum?`: `number` ; `indexerBlock?`: `number` ; `indexerChecksum?`: `string` ; `isEligible`: `boolean` ; `listeningAddress`: `string`[] ; `network`: `string`  }\>

#### Defined in

[src/api/node/getInfo.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/node/getInfo.ts#L10)

___

### getMessagesSize

▸ **getMessagesSize**(`payload`): `Promise`\<\{ `size`: `number`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `size`: `number`  }\>

#### Defined in

[src/api/messages/getMessagesSize.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/messages/getMessagesSize.ts#L10)

___

### getMetrics

▸ **getMetrics**(`payload`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api/node/getMetrics.ts:5](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/node/getMetrics.ts#L5)

___

### getNativeAddress

▸ **getNativeAddress**(`payload`): `Promise`\<`string`\>

Get the native address of the node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`string`\>

A Promise that resolves to the native address.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/account/getNativeAddress.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/account/getNativeAddress.ts#L12)

___

### getNativeBalance

▸ **getNativeBalance**(`payload`): `Promise`\<`string`\>

Get the native balance of the node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`string`\>

A Promise that resolves with a string representing the native balance.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/account/getNativeBalance.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/account/getNativeBalance.ts#L12)

___

### getPeer

▸ **getPeer**(`payload`): `Promise`\<\{ `announced`: `string`[] ; `observed`: `string`[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `announced`: `string`[] ; `observed`: `string`[]  }\>

#### Defined in

[src/api/peers/getPeer.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/peers/getPeer.ts#L10)

___

### getPeers

▸ **getPeers**(`payload`): `Promise`\<\{ `announced`: \{ `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string`  }[] ; `connected`: \{ `backoff`: `number` ; `heartbeats`: \{ `sent`: `number` ; `success`: `number`  } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `lastSeenLatency`: `number` ; `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string` ; `quality`: `number` ; `reportedVersion`: `string`  }[]  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.quality?` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `announced`: \{ `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string`  }[] ; `connected`: \{ `backoff`: `number` ; `heartbeats`: \{ `sent`: `number` ; `success`: `number`  } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `lastSeenLatency`: `number` ; `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string` ; `quality`: `number` ; `reportedVersion`: `string`  }[]  }\>

#### Defined in

[src/api/node/getPeers.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/node/getPeers.ts#L10)

___

### getTicketPrice

▸ **getTicketPrice**(`payload`): `Promise`\<\{ `price`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `price`: `string`  }\>

#### Defined in

[src/api/network/getTicketPrice.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/network/getTicketPrice.ts#L10)

___

### getTicketStatistics

▸ **getTicketStatistics**(`payload`): `Promise`\<\{ `neglectedValue`: `string` ; `redeemedValue`: `string` ; `rejectedValue`: `string` ; `unredeemedValue`: `string` ; `winningCount`: `number`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `neglectedValue`: `string` ; `redeemedValue`: `string` ; `rejectedValue`: `string` ; `unredeemedValue`: `string` ; `winningCount`: `number`  }\>

#### Defined in

[src/api/tickets/getTicketStatistics.ts:9](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/tickets/getTicketStatistics.ts#L9)

___

### getToken

▸ **getToken**(`payload`): `Promise`\<\{ `capabilities`: \{ `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }[]  }[] ; `description?`: `string` ; `id`: `string` ; `valid_until?`: `number`  }\>

Get the full token information for the token used in authentication.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `capabilities`: \{ `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }[]  }[] ; `description?`: `string` ; `id`: `string` ; `valid_until?`: `number`  }\>

A Promise that resolves to an object with the token info.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/tokens/getToken.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/tokens/getToken.ts#L18)

___

### getVersion

▸ **getVersion**(`payload`): `Promise`\<`string`\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`string`\>

#### Defined in

[src/api/node/getVersion.ts:5](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/node/getVersion.ts#L5)

___

### isNodeHealthy

▸ **isNodeHealthy**(`payload`): `Promise`\<`boolean`\>

Check whether the node is healthy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to a boolean stating that the node is healthy or not.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/checks/isNodeHealthy.ts:15](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/checks/isNodeHealthy.ts#L15)

___

### isNodeReady

▸ **isNodeReady**(`payload`): `Promise`\<`boolean`\>

Check whether the node is healthy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to a boolean stating that the node is healthy or not.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/checks/isNodeReady.ts:15](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/checks/isNodeReady.ts#L15)

___

### isNodeStarted

▸ **isNodeStarted**(`payload`): `Promise`\<`boolean`\>

Check whether the node is healthy.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to a boolean stating that the node is healthy or not.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/checks/isNodeStarted.ts:15](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/checks/isNodeStarted.ts#L15)

___

### openChannel

▸ **openChannel**(`payload`): `Promise`\<\{ `channelId`: `string` ; `transactionReceipt`: `string`  }\>

Opens a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId, and the amount of HOPR tokens to be staked in the channel.

This operation may take more than 5 minutes to complete as it involves on-chain operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.amount` | `string` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerAddress` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `channelId`: `string` ; `transactionReceipt`: `string`  }\>

A Promise that resolves with the response of the open channel operation.

**`Throws`**

APIError - If the operation fails. The error object contains the status code and the error message.

#### Defined in

[src/api/channels/openChannel.ts:19](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/channels/openChannel.ts#L19)

___

### peekAllMessages

▸ **peekAllMessages**(`payload`): `Promise`\<\{ `messages`: \{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }[]  }\>

Peek the list of messages currently present in the nodes message inbox,
filtered by tag, and optionally by timestamp (epoch in milliseconds).
The messages are not removed from the inbox.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag?` | ``null`` \| `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `messages`: \{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }[]  }\>

- A promise that resolves to the list of messages currently present in the nodes message inbox.

#### Defined in

[src/api/messages/peekAllMessages.ts:17](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/messages/peekAllMessages.ts#L17)

___

### peekMessage

▸ **peekMessage**(`payload`): `Promise`\<\{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }\>

Peek the oldest message currently present in the nodes message inbox.
The message is not removed from the inbox.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag?` | ``null`` \| `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }\>

- A promise that resolves to the oldest message currently present in the nodes message inbox.

#### Defined in

[src/api/messages/peekMessage.ts:16](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/messages/peekMessage.ts#L16)

___

### pingPeer

▸ **pingPeer**(`payload`): `Promise`\<\{ `latency`: `number` ; `reportedVersion`: `string`  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `latency`: `number` ; `reportedVersion`: `string`  }\>

#### Defined in

[src/api/peers/pingPeer.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/peers/pingPeer.ts#L10)

___

### popAllMessages

▸ **popAllMessages**(`payload`): `Promise`\<\{ `messages`: \{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }[]  }\>

Get the list of messages currently present in the nodes message inbox.
The messages are removed from the inbox.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag?` | ``null`` \| `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `messages`: \{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }[]  }\>

- A promise that resolves to the list of messages currently present in the nodes message inbox.

#### Defined in

[src/api/messages/popAllMessages.ts:16](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/messages/popAllMessages.ts#L16)

___

### popMessage

▸ **popMessage**(`payload`): `Promise`\<\{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }\>

Get the oldest message currently present in the nodes message inbox.
The message is removed from the inbox.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.tag?` | ``null`` \| `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<\{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }\>

- A promise that resolves to the oldest message currently present in the nodes message inbox.

#### Defined in

[src/api/messages/popMessage.ts:16](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/messages/popMessage.ts#L16)

___

### redeemChannelTickets

▸ **redeemChannelTickets**(`payload`): `Promise`\<`boolean`\>

Redeems all the unredeemed HOPR tickets in a channel.

This operation may take more than 5 minutes to complete as it involves on-chain operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.channelId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to a boolean indicating the success of the operation.
True if the operation is successful, false otherwise.

**`Throws`**

APIError - If the operation fails. The error object contains the status code and the error message.

#### Defined in

[src/api/channels/redeemChannelTickets.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/channels/redeemChannelTickets.ts#L18)

___

### redeemTickets

▸ **redeemTickets**(`payload`): `Promise`\<`boolean`\>

Redeems all the unredeemed HOPR tickets owned by the HOPR node.

This operation may take more than 5 minutes to complete as it involves on-chain operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to a boolean indicating the success of the operation.
True if the operation is successful, false otherwise.

**`Throws`**

APIError - If the operation fails. The error object contains the status code and the error message.

#### Defined in

[src/api/tickets/redeemTickets.ts:14](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/tickets/redeemTickets.ts#L14)

___

### removeAlias

▸ **removeAlias**(`payload`): `Promise`\<`boolean`\>

Unassign an alias from a PeerId.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.alias` | `string` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if the alias was successfully removed.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/aliases/removeAlias.ts:14](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/aliases/removeAlias.ts#L14)

___

### sendMessage

▸ **sendMessage**(`payload`): `Promise`\<`string`\>

Send a message to another peer using a given path (list of node addresses that should relay our message through network). If no path is given, HOPR will attempt to find a path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.body` | `string` | - |
| `payload.hops?` | `number` | - |
| `payload.path?` | `string`[] | - |
| `payload.peerId` | `string` | - |
| `payload.tag` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`string`\>

- A promise that resolves to the sent message.

#### Defined in

[src/api/messages/sendMessage.ts:13](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/messages/sendMessage.ts#L13)

___

### setAlias

▸ **setAlias**(`payload`): `Promise`\<`boolean`\>

Instead of using HOPR address, we can assign HOPR address to a specific name called alias.
Give an address a more memorable alias and use it instead of Hopr address.
Aliases are kept locally and are not saved or shared on the network.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.alias` | `string` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerId` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`boolean`\>

A Promise that resolves to true if alias successfully linked to peerId.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/aliases/setAlias.ts:20](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/aliases/setAlias.ts#L20)

___

### websocket

▸ **websocket**(`payload`): `WebSocket`

Creates a WebSocket instance with the specified IP and API token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`WebSocket`

A WebSocket instance.

#### Defined in

[src/api/messages/websocket.ts:14](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/messages/websocket.ts#L14)

___

### withdraw

▸ **withdraw**(`payload`): `Promise`\<`string`\>

Withdraw the given currency amount to the specified recipient address.
This operation may take more than 5 minutes to complete as it involves on-chain operations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.amount` | `string` | - |
| `payload.apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.currency` | ``"NATIVE"`` \| ``"HOPR"`` | - |
| `payload.ethereumAddress` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`\<`string`\>

A Promise that resolves to the transaction receipt.

**`Throws`**

An error that occurred while processing the request.

#### Defined in

[src/api/account/withdraw.ts:16](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/api/account/withdraw.ts#L16)
