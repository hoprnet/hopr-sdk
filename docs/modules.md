# @hoprnet/hopr-sdk

## Table of contents

### Namespaces

- [api](modules/api.md)
- [flows](modules/flows.md)
- [utils](modules/utils.md)
- [web3](modules/web3.md)

### Classes

- [HoprSDK](classes/HoprSDK.md)

### Type Aliases

- [APIErrorResponseType](modules.md#apierrorresponsetype)
- [AggregateChannelTicketsPayloadType](modules.md#aggregatechannelticketspayloadtype)
- [AliasPayloadType](modules.md#aliaspayloadtype)
- [BasePayloadType](modules.md#basepayloadtype)
- [CloseChannelPayloadType](modules.md#closechannelpayloadtype)
- [CloseChannelResponseType](modules.md#closechannelresponsetype)
- [CreateTokenPayloadType](modules.md#createtokenpayloadtype)
- [CreateTokenResponseType](modules.md#createtokenresponsetype)
- [DeleteMessagesPayloadType](modules.md#deletemessagespayloadtype)
- [DeleteTokenPayloadType](modules.md#deletetokenpayloadtype)
- [FundChannelsPayloadType](modules.md#fundchannelspayloadtype)
- [FundChannelsResponseType](modules.md#fundchannelsresponsetype)
- [GetAddressesResponseType](modules.md#getaddressesresponsetype)
- [GetAliasResponseType](modules.md#getaliasresponsetype)
- [GetAliasesResponseType](modules.md#getaliasesresponsetype)
- [GetBalancesResponseType](modules.md#getbalancesresponsetype)
- [GetChannelPayloadType](modules.md#getchannelpayloadtype)
- [GetChannelResponseType](modules.md#getchannelresponsetype)
- [GetChannelTicketsPayloadType](modules.md#getchannelticketspayloadtype)
- [GetChannelTicketsResponseType](modules.md#getchannelticketsresponsetype)
- [GetChannelsPayloadType](modules.md#getchannelspayloadtype)
- [GetChannelsResponseType](modules.md#getchannelsresponsetype)
- [GetEntryNodesResponseType](modules.md#getentrynodesresponsetype)
- [GetInfoResponseType](modules.md#getinforesponsetype)
- [GetMessagesSizePayloadType](modules.md#getmessagessizepayloadtype)
- [GetMessagesSizeResponseType](modules.md#getmessagessizeresponsetype)
- [GetPeerPayloadType](modules.md#getpeerpayloadtype)
- [GetPeerResponseType](modules.md#getpeerresponsetype)
- [GetPeersPayloadType](modules.md#getpeerspayloadtype)
- [GetPeersResponseType](modules.md#getpeersresponsetype)
- [GetSettingsResponseType](modules.md#getsettingsresponsetype)
- [GetStatisticsResponseType](modules.md#getstatisticsresponsetype)
- [GetTicketsResponseType](modules.md#getticketsresponsetype)
- [GetTokenResponseType](modules.md#gettokenresponsetype)
- [OpenChannelPayloadType](modules.md#openchannelpayloadtype)
- [OpenChannelResponseType](modules.md#openchannelresponsetype)
- [PingPeerPayloadType](modules.md#pingpeerpayloadtype)
- [PingPeerResponseType](modules.md#pingpeerresponsetype)
- [PopAllMessagesPayloadType](modules.md#popallmessagespayloadtype)
- [PopAllMessagesResponseType](modules.md#popallmessagesresponsetype)
- [PopMessagePayloadType](modules.md#popmessagepayloadtype)
- [PopMessageResponseType](modules.md#popmessageresponsetype)
- [RedeemChannelTicketsPayloadType](modules.md#redeemchannelticketspayloadtype)
- [RemoveBasicAuthenticationPayloadType](modules.md#removebasicauthenticationpayloadtype)
- [SendMessagePayloadType](modules.md#sendmessagepayloadtype)
- [SetAliasPayloadType](modules.md#setaliaspayloadtype)
- [SetSettingPayloadType](modules.md#setsettingpayloadtype)
- [WithdrawPayloadType](modules.md#withdrawpayloadtype)
- [createWsUrlType](modules.md#createwsurltype)

### Variables

- [APIErrorResponse](modules.md#apierrorresponse)
- [AggregateChannelTicketsPayload](modules.md#aggregatechannelticketspayload)
- [AliasPayload](modules.md#aliaspayload)
- [BasePayload](modules.md#basepayload)
- [Channel](modules.md#channel)
- [CloseChannelPayload](modules.md#closechannelpayload)
- [CloseChannelResponse](modules.md#closechannelresponse)
- [CreateTokenPayload](modules.md#createtokenpayload)
- [CreateTokenResponse](modules.md#createtokenresponse)
- [DeleteMessagesPayload](modules.md#deletemessagespayload)
- [DeleteTokenPayload](modules.md#deletetokenpayload)
- [FundChannelsPayload](modules.md#fundchannelspayload)
- [FundChannelsResponse](modules.md#fundchannelsresponse)
- [GetAddressesResponse](modules.md#getaddressesresponse)
- [GetAliasResponse](modules.md#getaliasresponse)
- [GetAliasesResponse](modules.md#getaliasesresponse)
- [GetBalancesResponse](modules.md#getbalancesresponse)
- [GetChannelPayload](modules.md#getchannelpayload)
- [GetChannelResponse](modules.md#getchannelresponse)
- [GetChannelTicketsPayload](modules.md#getchannelticketspayload)
- [GetChannelTicketsResponse](modules.md#getchannelticketsresponse)
- [GetChannelsPayload](modules.md#getchannelspayload)
- [GetChannelsResponse](modules.md#getchannelsresponse)
- [GetEntryNodesResponse](modules.md#getentrynodesresponse)
- [GetInfoResponse](modules.md#getinforesponse)
- [GetMessagesSizePayload](modules.md#getmessagessizepayload)
- [GetMessagesSizeResponse](modules.md#getmessagessizeresponse)
- [GetPeerPayload](modules.md#getpeerpayload)
- [GetPeerResponse](modules.md#getpeerresponse)
- [GetPeersPayload](modules.md#getpeerspayload)
- [GetPeersResponse](modules.md#getpeersresponse)
- [GetSettingsResponse](modules.md#getsettingsresponse)
- [GetStatisticsResponse](modules.md#getstatisticsresponse)
- [GetTicketsResponse](modules.md#getticketsresponse)
- [GetTokenResponse](modules.md#gettokenresponse)
- [OpenChannelPayload](modules.md#openchannelpayload)
- [OpenChannelResponse](modules.md#openchannelresponse)
- [Peer](modules.md#peer)
- [PingPeerPayload](modules.md#pingpeerpayload)
- [PingPeerResponse](modules.md#pingpeerresponse)
- [PopAllMessagesPayload](modules.md#popallmessagespayload)
- [PopAllMessagesResponse](modules.md#popallmessagesresponse)
- [PopMessagePayload](modules.md#popmessagepayload)
- [PopMessageResponse](modules.md#popmessageresponse)
- [ReceivedMessage](modules.md#receivedmessage)
- [RedeemChannelTicketsPayload](modules.md#redeemchannelticketspayload)
- [SendMessagePayload](modules.md#sendmessagepayload)
- [SetAliasPayload](modules.md#setaliaspayload)
- [SetSettingPayload](modules.md#setsettingpayload)
- [Ticket](modules.md#ticket)
- [TokenCapability](modules.md#tokencapability)
- [WithdrawPayload](modules.md#withdrawpayload)
- [WithdrawResponse](modules.md#withdrawresponse)
- [createWsUrlPayload](modules.md#createwsurlpayload)

## Type Aliases

### APIErrorResponseType

Ƭ **APIErrorResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `string` |
| `status` | `string` |

#### Defined in

[src/types/error.ts:8](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/error.ts#L8)

___

### AggregateChannelTicketsPayloadType

Ƭ **AggregateChannelTicketsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:49](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L49)

___

### AliasPayloadType

Ƭ **AliasPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `alias` | `string` | - |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/aliases.ts:12](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/aliases.ts#L12)

___

### BasePayloadType

Ƭ **BasePayloadType**: `Object`

Represents the inferred TypeScript type from BasicAuthenticationPayload.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/general.ts:26](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/general.ts#L26)

___

### CloseChannelPayloadType

Ƭ **CloseChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:135](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L135)

___

### CloseChannelResponseType

Ƭ **CloseChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channelStatus` | ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` |
| `receipt` | `string` |

#### Defined in

[src/types/channels.ts:142](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L142)

___

### CreateTokenPayloadType

Ƭ **CreateTokenPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `capabilities` | { `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: { type: string; conditions?: { max?: number \| undefined; } \| undefined; }[]  }[] | - |
| `description` | `string` | - |
| `lifetime` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/tokens.ts:77](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L77)

___

### CreateTokenResponseType

Ƭ **CreateTokenResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Defined in

[src/types/tokens.ts:83](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L83)

___

### DeleteMessagesPayloadType

Ƭ **DeleteMessagesPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:33](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L33)

___

### DeleteTokenPayloadType

Ƭ **DeleteTokenPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `id` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/tokens.ts:106](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L106)

___

### FundChannelsPayloadType

Ƭ **FundChannelsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | - |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:62](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L62)

___

### FundChannelsResponseType

Ƭ **FundChannelsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipt` | `string` |

#### Defined in

[src/types/channels.ts:68](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L68)

___

### GetAddressesResponseType

Ƭ **GetAddressesResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hopr` | `string` |
| `native` | `string` |

#### Defined in

[src/types/account.ts:27](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/account.ts#L27)

___

### GetAliasResponseType

Ƭ **GetAliasResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `peerId` | `string` |

#### Defined in

[src/types/aliases.ts:39](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/aliases.ts#L39)

___

### GetAliasesResponseType

Ƭ **GetAliasesResponseType**: `Record`<`string`, `string`\>

#### Defined in

[src/types/aliases.ts:20](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/aliases.ts#L20)

___

### GetBalancesResponseType

Ƭ **GetBalancesResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hopr` | `string` |
| `native` | `string` |
| `safeHopr` | `string` |
| `safeHoprAllowance` | `string` |
| `safeNative` | `string` |

#### Defined in

[src/types/account.ts:16](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/account.ts#L16)

___

### GetChannelPayloadType

Ƭ **GetChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:150](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L150)

___

### GetChannelResponseType

Ƭ **GetChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balance` | `string` |
| `channelEpoch` | `string` |
| `channelId` | `string` |
| `closureTime` | `string` |
| `destinationAddress` | `string` |
| `destinationPeerId` | `string` |
| `sourceAddress` | `string` |
| `sourcePeerId` | `string` |
| `status` | ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` |
| `ticketIndex` | `string` |

#### Defined in

[src/types/channels.ts:154](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L154)

___

### GetChannelTicketsPayloadType

Ƭ **GetChannelTicketsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:109](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L109)

___

### GetChannelTicketsResponseType

Ƭ **GetChannelTicketsResponseType**: { `amount`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `index`: `string` ; `indexOffset`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]

#### Defined in

[src/types/channels.ts:125](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L125)

___

### GetChannelsPayloadType

Ƭ **GetChannelsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `fullTopology?` | `boolean` | - |
| `includingClosed?` | `boolean` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:93](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L93)

___

### GetChannelsResponseType

Ƭ **GetChannelsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `all` | { status: "Open" \| "PendingToClose" \| "Closed"; channelId: string; sourcePeerId: string; destinationPeerId: string; sourceAddress: string; destinationAddress: string; balance: string; ticketIndex: string; channelEpoch: string; closureTime: string; }[] |
| `incoming` | { type: "incoming" \| "outgoing"; status: "Open" \| "PendingToClose" \| "Closed"; balance: string; id: string; peerAddress: string; }[] |
| `outgoing` | { type: "incoming" \| "outgoing"; status: "Open" \| "PendingToClose" \| "Closed"; balance: string; id: string; peerAddress: string; }[] |

#### Defined in

[src/types/channels.ts:101](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L101)

___

### GetEntryNodesResponseType

Ƭ **GetEntryNodesResponseType**: `Record`<`string`, { `isEligible`: `boolean` ; `multiaddrs`: `string`[]  }\>

#### Defined in

[src/types/node.ts:68](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L68)

___

### GetInfoResponseType

Ƭ **GetInfoResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announcedAddress` | `string`[] |
| `chain` | `string` |
| `channelClosurePeriod` | `number` |
| `connectivityStatus` | `string` |
| `hoprChannels` | `string` |
| `hoprNetworkRegistryAddress?` | `string` |
| `hoprNodeSafeRegistryAddress?` | `string` |
| `hoprToken` | `string` |
| `isEligible` | `boolean` |
| `listeningAddress` | `string`[] |
| `network` | `string` |
| `nodeManagementModule` | `string` |
| `nodeSafe` | `string` |

#### Defined in

[src/types/node.ts:55](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L55)

___

### GetMessagesSizePayloadType

Ƭ **GetMessagesSizePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:41](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L41)

___

### GetMessagesSizeResponseType

Ƭ **GetMessagesSizeResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Defined in

[src/types/messages.ts:47](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L47)

___

### GetPeerPayloadType

Ƭ **GetPeerPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/peers.ts:12](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/peers.ts#L12)

___

### GetPeerResponseType

Ƭ **GetPeerResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announced` | `string`[] |
| `observed` | `string`[] |

#### Defined in

[src/types/peers.ts:19](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/peers.ts#L19)

___

### GetPeersPayloadType

Ƭ **GetPeersPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `quality?` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/node.ts:12](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L12)

___

### GetPeersResponseType

Ƭ **GetPeersResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announced` | { peerId: string; peerAddress: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; reportedVersion: string; }[] |
| `connected` | { peerId: string; peerAddress: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; reportedVersion: string; }[] |

#### Defined in

[src/types/node.ts:33](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L33)

___

### GetSettingsResponseType

Ƭ **GetSettingsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `includeRecipient` | `boolean` |

#### Defined in

[src/types/settings.ts:12](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/settings.ts#L12)

___

### GetStatisticsResponseType

Ƭ **GetStatisticsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `losingTickets` | `number` |
| `neglected` | `number` |
| `pending` | `number` |
| `redeemed` | `number` |
| `redeemedValue` | `string` |
| `rejected` | `number` |
| `rejectedValue` | `string` |
| `unredeemed` | `number` |
| `unredeemedValue` | `string` |
| `winProportion` | `number` |

#### Defined in

[src/types/tickets.ts:20](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tickets.ts#L20)

___

### GetTicketsResponseType

Ƭ **GetTicketsResponseType**: { `amount`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `index`: `string` ; `indexOffset`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]

#### Defined in

[src/types/tickets.ts:38](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tickets.ts#L38)

___

### GetTokenResponseType

Ƭ **GetTokenResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `capabilities` | { endpoint: "accountWithdraw" \| "accountGetBalances" \| "accountGetAddresses" \| "aliasesGetAliases" \| "aliasesSetAlias" \| "aliasesGetAlias" \| "aliasesRemoveAlias" \| "channelsFundChannels" \| ... 24 more ... \| "tokensDelete"; limits: { ...; }[]; }[] |
| `description?` | `string` |
| `id` | `string` |
| `valid_until?` | `number` |

#### Defined in

[src/types/tokens.ts:96](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L96)

___

### OpenChannelPayloadType

Ƭ **OpenChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | - |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerAddress` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:77](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L77)

___

### OpenChannelResponseType

Ƭ **OpenChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `transactionReceipt` | `string` |

#### Defined in

[src/types/channels.ts:84](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L84)

___

### PingPeerPayloadType

Ƭ **PingPeerPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/peers.ts:29](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/peers.ts#L29)

___

### PingPeerResponseType

Ƭ **PingPeerResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `latency` | `number` |
| `reportedVersion` | `string` |

#### Defined in

[src/types/peers.ts:36](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/peers.ts#L36)

___

### PopAllMessagesPayloadType

Ƭ **PopAllMessagesPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:69](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L69)

___

### PopAllMessagesResponseType

Ƭ **PopAllMessagesResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messages` | { tag: number; body: string; }[] |

#### Defined in

[src/types/messages.ts:75](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L75)

___

### PopMessagePayloadType

Ƭ **PopMessagePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:57](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L57)

___

### PopMessageResponseType

Ƭ **PopMessageResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | `string` |
| `tag` | `number` |

#### Defined in

[src/types/messages.ts:61](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L61)

___

### RedeemChannelTicketsPayloadType

Ƭ **RedeemChannelTicketsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:37](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L37)

___

### RemoveBasicAuthenticationPayloadType

Ƭ **RemoveBasicAuthenticationPayloadType**<`T`\>: `Pick`<`T`, `Exclude`<keyof `T`, ``"apiEndpoint"`` \| ``"apiToken"``\>\>

Removes the basic authentication properties from a payload type.

**`Typeparam`**

T - The payload type from which to remove the properties.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`BasePayloadType`](modules.md#basepayloadtype) |

#### Defined in

[src/types/general.ts:32](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/general.ts#L32)

___

### SendMessagePayloadType

Ƭ **SendMessagePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `body` | `string` | - |
| `hops?` | `number` | - |
| `path?` | `string`[] | - |
| `peerId` | `string` | - |
| `tag` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:25](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L25)

___

### SetAliasPayloadType

Ƭ **SetAliasPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `alias` | `string` | - |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/aliases.ts:31](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/aliases.ts#L31)

___

### SetSettingPayloadType

Ƭ **SetSettingPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `setting` | `string` | - |
| `settingValue?` | `any` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/settings.ts:23](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/settings.ts#L23)

___

### WithdrawPayloadType

Ƭ **WithdrawPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | - |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `currency` | ``"NATIVE"`` \| ``"HOPR"`` | - |
| `ethereumAddress` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/account.ts:39](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/account.ts#L39)

___

### createWsUrlType

Ƭ **createWsUrlType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `path?` | `string` | optional path for the websocker |

#### Defined in

[src/types/websocket.ts:24](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/websocket.ts#L24)

## Variables

### APIErrorResponse

• `Const` **APIErrorResponse**: `ZodObject`<[`APIErrorResponseType`](modules.md#apierrorresponsetype)\>

#### Defined in

[src/types/error.ts:3](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/error.ts#L3)

___

### AggregateChannelTicketsPayload

• `Const` **AggregateChannelTicketsPayload**: `ZodObject`<{ `apiEndpoint`: `ZodString` ; `apiToken`: `ZodString` ; `channelId`: `ZodString` ; `timeout`: `ZodOptional`<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, { `apiEndpoint`: `string` ; `apiToken`: `string` ; `channelId`: `string` ; `timeout?`: `number`  }, { `apiEndpoint`: `string` ; `apiToken`: `string` ; `channelId`: `string` ; `timeout?`: `number`  }\>

Aggregate channel tickets

#### Defined in

[src/types/channels.ts:45](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L45)

___

### AliasPayload

• `Const` **AliasPayload**: `ZodObject`<[`AliasPayloadType`](modules.md#aliaspayloadtype)\>

General

#### Defined in

[src/types/aliases.ts:8](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/aliases.ts#L8)

___

### BasePayload

• `Const` **BasePayload**: `ZodObject`<[`BasePayloadType`](modules.md#basepayloadtype)\>

Represents the minimum payload needed to interact with hoprd node.

#### Defined in

[src/types/general.ts:6](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/general.ts#L6)

___

### Channel

• `Const` **Channel**: `ZodObject`<{ `balance`: `ZodString` ; `id`: `ZodString` ; `peerAddress`: `ZodString` ; `status`: `ZodEnum`<[``"Open"``, ``"PendingToClose"``, ``"Closed"``]\> = ChannelStatus; `type`: `ZodEnum`<[``"incoming"``, ``"outgoing"``]\>  }, ``"strip"``, `ZodTypeAny`, { `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `type`: ``"incoming"`` \| ``"outgoing"``  }, { `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `type`: ``"incoming"`` \| ``"outgoing"``  }\>

#### Defined in

[src/types/channels.ts:21](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L21)

___

### CloseChannelPayload

• `Const` **CloseChannelPayload**: `ZodObject`<[`CloseChannelPayloadType`](modules.md#closechannelpayloadtype)\>

Close channel

#### Defined in

[src/types/channels.ts:131](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L131)

___

### CloseChannelResponse

• `Const` **CloseChannelResponse**: `ZodObject`<[`CloseChannelResponseType`](modules.md#closechannelresponsetype)\>

#### Defined in

[src/types/channels.ts:137](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L137)

___

### CreateTokenPayload

• `Const` **CreateTokenPayload**: `ZodObject`<[`CreateTokenPayloadType`](modules.md#createtokenpayloadtype)\>

createToken

#### Defined in

[src/types/tokens.ts:71](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L71)

___

### CreateTokenResponse

• `Const` **CreateTokenResponse**: `ZodObject`<[`CreateTokenResponseType`](modules.md#createtokenresponsetype)\>

#### Defined in

[src/types/tokens.ts:79](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L79)

___

### DeleteMessagesPayload

• `Const` **DeleteMessagesPayload**: `ZodObject`<[`DeleteMessagesPayloadType`](modules.md#deletemessagespayloadtype)\>

Delete Messages

#### Defined in

[src/types/messages.ts:29](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L29)

___

### DeleteTokenPayload

• `Const` **DeleteTokenPayload**: `ZodObject`<[`DeleteTokenPayloadType`](modules.md#deletetokenpayloadtype)\>

deleteToken

#### Defined in

[src/types/tokens.ts:102](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L102)

___

### FundChannelsPayload

• `Const` **FundChannelsPayload**: `ZodObject`<[`FundChannelsPayloadType`](modules.md#fundchannelspayloadtype)\>

Fund channel

#### Defined in

[src/types/channels.ts:57](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L57)

___

### FundChannelsResponse

• `Const` **FundChannelsResponse**: `ZodObject`<[`FundChannelsResponseType`](modules.md#fundchannelsresponsetype)\>

#### Defined in

[src/types/channels.ts:64](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L64)

___

### GetAddressesResponse

• `Const` **GetAddressesResponse**: `ZodObject`<[`GetAddressesResponseType`](modules.md#getaddressesresponsetype)\>

addresses

#### Defined in

[src/types/account.ts:22](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/account.ts#L22)

___

### GetAliasResponse

• `Const` **GetAliasResponse**: `ZodObject`<[`GetAliasResponseType`](modules.md#getaliasresponsetype)\>

getAlias

#### Defined in

[src/types/aliases.ts:37](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/aliases.ts#L37)

___

### GetAliasesResponse

• `Const` **GetAliasesResponse**: `ZodRecord`<[`GetAliasesResponseType`](modules.md#getaliasesresponsetype)\>

getAliases

#### Defined in

[src/types/aliases.ts:18](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/aliases.ts#L18)

___

### GetBalancesResponse

• `Const` **GetBalancesResponse**: `ZodObject`<[`GetBalancesResponseType`](modules.md#getbalancesresponsetype)\>

balances

#### Defined in

[src/types/account.ts:8](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/account.ts#L8)

___

### GetChannelPayload

• `Const` **GetChannelPayload**: `ZodObject`<[`GetChannelPayloadType`](modules.md#getchannelpayloadtype)\>

Get channel

#### Defined in

[src/types/channels.ts:146](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L146)

___

### GetChannelResponse

• `Const` **GetChannelResponse**: `ZodObject`<[`GetChannelResponseType`](modules.md#getchannelresponsetype)\> = `TopologyChannel`

#### Defined in

[src/types/channels.ts:152](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L152)

___

### GetChannelTicketsPayload

• `Const` **GetChannelTicketsPayload**: `ZodObject`<[`GetChannelTicketsPayloadType`](modules.md#getchannelticketspayloadtype)\>

Get channel tickets

#### Defined in

[src/types/channels.ts:105](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L105)

___

### GetChannelTicketsResponse

• `Const` **GetChannelTicketsResponse**: `ZodArray`<[`GetChannelTicketsResponseType`](modules.md#getchannelticketsresponsetype)\>

#### Defined in

[src/types/channels.ts:123](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L123)

___

### GetChannelsPayload

• `Const` **GetChannelsPayload**: `ZodObject`<[`GetChannelsPayloadType`](modules.md#getchannelspayloadtype)\>

Get channels

#### Defined in

[src/types/channels.ts:88](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L88)

___

### GetChannelsResponse

• `Const` **GetChannelsResponse**: `ZodObject`<[`GetChannelsResponseType`](modules.md#getchannelsresponsetype)\>

#### Defined in

[src/types/channels.ts:95](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L95)

___

### GetEntryNodesResponse

• `Const` **GetEntryNodesResponse**: `ZodRecord`<[`GetEntryNodesResponseType`](modules.md#getentrynodesresponsetype)\>

#### Defined in

[src/types/node.ts:66](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L66)

___

### GetInfoResponse

• `Const` **GetInfoResponse**: `ZodObject`<[`GetInfoResponseType`](modules.md#getinforesponsetype)\>

Get Info

#### Defined in

[src/types/node.ts:39](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L39)

___

### GetMessagesSizePayload

• `Const` **GetMessagesSizePayload**: `ZodObject`<[`GetMessagesSizePayloadType`](modules.md#getmessagessizepayloadtype)\>

Get Messages Size

#### Defined in

[src/types/messages.ts:37](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L37)

___

### GetMessagesSizeResponse

• `Const` **GetMessagesSizeResponse**: `ZodObject`<[`GetMessagesSizeResponseType`](modules.md#getmessagessizeresponsetype)\>

#### Defined in

[src/types/messages.ts:43](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L43)

___

### GetPeerPayload

• `Const` **GetPeerPayload**: `ZodObject`<[`GetPeerPayloadType`](modules.md#getpeerpayloadtype)\>

Get peer

#### Defined in

[src/types/peers.ts:8](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/peers.ts#L8)

___

### GetPeerResponse

• `Const` **GetPeerResponse**: `ZodObject`<[`GetPeerResponseType`](modules.md#getpeerresponsetype)\>

#### Defined in

[src/types/peers.ts:14](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/peers.ts#L14)

___

### GetPeersPayload

• `Const` **GetPeersPayload**: `ZodObject`<[`GetPeersPayloadType`](modules.md#getpeerspayloadtype)\>

Get peers

#### Defined in

[src/types/node.ts:8](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L8)

___

### GetPeersResponse

• `Const` **GetPeersResponse**: `ZodObject`<[`GetPeersResponseType`](modules.md#getpeersresponsetype)\>

#### Defined in

[src/types/node.ts:28](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L28)

___

### GetSettingsResponse

• `Const` **GetSettingsResponse**: `ZodObject`<[`GetSettingsResponseType`](modules.md#getsettingsresponsetype)\>

Get settings

#### Defined in

[src/types/settings.ts:8](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/settings.ts#L8)

___

### GetStatisticsResponse

• `Const` **GetStatisticsResponse**: `ZodObject`<[`GetStatisticsResponseType`](modules.md#getstatisticsresponsetype)\>

Get statistics

#### Defined in

[src/types/tickets.ts:7](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tickets.ts#L7)

___

### GetTicketsResponse

• `Const` **GetTicketsResponse**: `ZodArray`<[`GetTicketsResponseType`](modules.md#getticketsresponsetype)\>

Get tickets

#### Defined in

[src/types/tickets.ts:26](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tickets.ts#L26)

___

### GetTokenResponse

• `Const` **GetTokenResponse**: `ZodObject`<[`GetTokenResponseType`](modules.md#gettokenresponsetype)\>

getToken

#### Defined in

[src/types/tokens.ts:89](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L89)

___

### OpenChannelPayload

• `Const` **OpenChannelPayload**: `ZodObject`<[`OpenChannelPayloadType`](modules.md#openchannelpayloadtype)\>

Open channel

#### Defined in

[src/types/channels.ts:72](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L72)

___

### OpenChannelResponse

• `Const` **OpenChannelResponse**: `ZodObject`<[`OpenChannelResponseType`](modules.md#openchannelresponsetype)\>

#### Defined in

[src/types/channels.ts:79](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L79)

___

### Peer

• `Const` **Peer**: `ZodObject`<{ `backoff`: `ZodNumber` ; `heartbeats`: `ZodObject`<{ `sent`: `ZodNumber` ; `success`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, { `sent`: `number` ; `success`: `number`  }, { `sent`: `number` ; `success`: `number`  }\> ; `isNew`: `ZodBoolean` ; `lastSeen`: `ZodNumber` ; `multiAddr`: `ZodString` ; `peerAddress`: `ZodString` ; `peerId`: `ZodString` ; `quality`: `ZodNumber` ; `reportedVersion`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `backoff`: `number` ; `heartbeats`: { sent: number; success: number; } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `multiAddr`: `string` ; `peerAddress`: `string` ; `peerId`: `string` ; `quality`: `number` ; `reportedVersion`: `string`  }, { `backoff`: `number` ; `heartbeats`: { sent: number; success: number; } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `multiAddr`: `string` ; `peerAddress`: `string` ; `peerId`: `string` ; `quality`: `number` ; `reportedVersion`: `string`  }\>

#### Defined in

[src/types/node.ts:14](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/node.ts#L14)

___

### PingPeerPayload

• `Const` **PingPeerPayload**: `ZodObject`<[`PingPeerPayloadType`](modules.md#pingpeerpayloadtype)\>

Ping peer

#### Defined in

[src/types/peers.ts:25](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/peers.ts#L25)

___

### PingPeerResponse

• `Const` **PingPeerResponse**: `ZodObject`<[`PingPeerResponseType`](modules.md#pingpeerresponsetype)\>

#### Defined in

[src/types/peers.ts:31](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/peers.ts#L31)

___

### PopAllMessagesPayload

• `Const` **PopAllMessagesPayload**: `ZodObject`<[`PopAllMessagesPayloadType`](modules.md#popallmessagespayloadtype)\>

Pop all messages

#### Defined in

[src/types/messages.ts:65](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L65)

___

### PopAllMessagesResponse

• `Const` **PopAllMessagesResponse**: `ZodObject`<[`PopAllMessagesResponseType`](modules.md#popallmessagesresponsetype)\>

#### Defined in

[src/types/messages.ts:71](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L71)

___

### PopMessagePayload

• `Const` **PopMessagePayload**: `ZodObject`<[`PopMessagePayloadType`](modules.md#popmessagepayloadtype)\>

Pop message

#### Defined in

[src/types/messages.ts:53](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L53)

___

### PopMessageResponse

• `Const` **PopMessageResponse**: `ZodObject`<[`PopMessageResponseType`](modules.md#popmessageresponsetype)\> = `ReceivedMessage`

#### Defined in

[src/types/messages.ts:59](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L59)

___

### ReceivedMessage

• `Const` **ReceivedMessage**: `ZodObject`<{ `body`: `ZodString` ; `tag`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, { `body`: `string` ; `tag`: `number`  }, { `body`: `string` ; `tag`: `number`  }\>

General

#### Defined in

[src/types/messages.ts:8](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L8)

___

### RedeemChannelTicketsPayload

• `Const` **RedeemChannelTicketsPayload**: `ZodObject`<[`AggregateChannelTicketsPayloadType`](modules.md#aggregatechannelticketspayloadtype)\>

Redeem channel tickets

#### Defined in

[src/types/channels.ts:33](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L33)

___

### SendMessagePayload

• `Const` **SendMessagePayload**: `ZodObject`<[`SendMessagePayloadType`](modules.md#sendmessagepayloadtype)\>

Send Message

#### Defined in

[src/types/messages.ts:17](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/messages.ts#L17)

___

### SetAliasPayload

• `Const` **SetAliasPayload**: `ZodObject`<[`SetAliasPayloadType`](modules.md#setaliaspayloadtype)\>

setAlias

#### Defined in

[src/types/aliases.ts:26](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/aliases.ts#L26)

___

### SetSettingPayload

• `Const` **SetSettingPayload**: `ZodObject`<[`SetSettingPayloadType`](modules.md#setsettingpayloadtype)\>

Set Setting

#### Defined in

[src/types/settings.ts:18](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/settings.ts#L18)

___

### Ticket

• `Const` **Ticket**: `ZodObject`<{ `amount`: `ZodString` ; `channelEpoch`: `ZodString` ; `channelId`: `ZodString` ; `index`: `ZodString` ; `indexOffset`: `ZodString` ; `signature`: `ZodString` ; `winProb`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `amount`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `index`: `string` ; `indexOffset`: `string` ; `signature`: `string` ; `winProb`: `string`  }, { `amount`: `string` ; `channelEpoch`: `string` ; `channelId`: `string` ; `index`: `string` ; `indexOffset`: `string` ; `signature`: `string` ; `winProb`: `string`  }\>

#### Defined in

[src/types/channels.ts:113](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/channels.ts#L113)

___

### TokenCapability

• `Const` **TokenCapability**: `ZodObject`<{ `endpoint`: `ZodEnum`<[``"accountWithdraw"``, ``"accountGetBalances"``, ``"accountGetAddresses"``, ``"aliasesGetAliases"``, ``"aliasesSetAlias"``, ``"aliasesGetAlias"``, ``"aliasesRemoveAlias"``, ``"channelsFundChannels"``, ``"channelsOpenChannel"``, ``"channelsGetChannels"``]\> ; `limits`: `ZodArray`<`ZodObject`<{ `conditions`: `ZodOptional`<`ZodObject`<{ `max`: `ZodOptional`<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, { `max?`: `number`  }, { `max?`: `number`  }\>\> ; `type`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `conditions?`: { max?: number \| undefined; } ; `type`: `string`  }, { `conditions?`: { max?: number \| undefined; } ; `type`: `string`  }\>, ``"many"``\>  }, ``"strip"``, `ZodTypeAny`, { `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: { type: string; conditions?: { max?: number \| undefined; } \| undefined; }[]  }, { `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: { type: string; conditions?: { max?: number \| undefined; } \| undefined; }[]  }\>

#### Defined in

[src/types/tokens.ts:55](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/tokens.ts#L55)

___

### WithdrawPayload

• `Const` **WithdrawPayload**: `ZodObject`<[`WithdrawPayloadType`](modules.md#withdrawpayloadtype)\>

withdraw

#### Defined in

[src/types/account.ts:33](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/account.ts#L33)

___

### WithdrawResponse

• `Const` **WithdrawResponse**: `ZodObject`<{ `receipt`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `receipt`: `string`  }, { `receipt`: `string`  }\>

#### Defined in

[src/types/account.ts:41](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/account.ts#L41)

___

### createWsUrlPayload

• `Const` **createWsUrlPayload**: `ZodObject`<[`createWsUrlType`](modules.md#createwsurltype)\>

createWsUrl

#### Defined in

[src/types/websocket.ts:7](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/types/websocket.ts#L7)
