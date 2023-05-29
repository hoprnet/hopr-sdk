# @hoprnet/hopr-sdk

## Table of contents

### Namespaces

- [api](modules/api.md)
- [utils](modules/utils.md)

### Classes

- [HoprSdk](classes/HoprSdk.md)

### Type Aliases

- [AccountResponseType](modules.md#accountresponsetype)
- [AliasPayloadType](modules.md#aliaspayloadtype)
- [BasePayloadType](modules.md#basepayloadtype)
- [CloseChannelPayloadType](modules.md#closechannelpayloadtype)
- [CloseChannelResponseType](modules.md#closechannelresponsetype)
- [CreateTokenPayloadType](modules.md#createtokenpayloadtype)
- [CreateTokenResponseType](modules.md#createtokenresponsetype)
- [DeleteTokenPayloadType](modules.md#deletetokenpayloadtype)
- [ErrorType](modules.md#errortype)
- [FundChannelsPayloadType](modules.md#fundchannelspayloadtype)
- [FundChannelsResponseType](modules.md#fundchannelsresponsetype)
- [GetAliasResponseType](modules.md#getaliasresponsetype)
- [GetAliasesResponseType](modules.md#getaliasesresponsetype)
- [GetChannelPayloadType](modules.md#getchannelpayloadtype)
- [GetChannelResponseType](modules.md#getchannelresponsetype)
- [GetChannelTicketsResponseType](modules.md#getchannelticketsresponsetype)
- [GetChannelsResponseType](modules.md#getchannelsresponsetype)
- [GetEntryNodesResponseType](modules.md#getentrynodesresponsetype)
- [GetInfoResponseType](modules.md#getinforesponsetype)
- [GetPeerInfoPayloadType](modules.md#getpeerinfopayloadtype)
- [GetPeerInfoResponseType](modules.md#getpeerinforesponsetype)
- [GetPeersPayloadType](modules.md#getpeerspayloadtype)
- [GetPeersResponseType](modules.md#getpeersresponsetype)
- [GetSettingsResponseType](modules.md#getsettingsresponsetype)
- [GetStatisticsResponseType](modules.md#getstatisticsresponsetype)
- [GetTicketsResponseType](modules.md#getticketsresponsetype)
- [GetTokenResponseType](modules.md#gettokenresponsetype)
- [OpenChannelPayloadType](modules.md#openchannelpayloadtype)
- [OpenChannelResponseType](modules.md#openchannelresponsetype)
- [PeerIdPayloadType](modules.md#peeridpayloadtype)
- [PingNodePayloadType](modules.md#pingnodepayloadtype)
- [PingNodeResponseType](modules.md#pingnoderesponsetype)
- [RemoveBasicAuthenticationPayloadType](modules.md#removebasicauthenticationpayloadtype)
- [SendMessagePayloadType](modules.md#sendmessagepayloadtype)
- [SetAliasPayloadType](modules.md#setaliaspayloadtype)
- [SetSettingPayloadType](modules.md#setsettingpayloadtype)
- [SignPayloadType](modules.md#signpayloadtype)
- [WithdrawPayloadType](modules.md#withdrawpayloadtype)

### Variables

- [AccountResponse](modules.md#accountresponse)
- [AliasPayload](modules.md#aliaspayload)
- [BasePayload](modules.md#basepayload)
- [Channel](modules.md#channel)
- [CloseChannelPayload](modules.md#closechannelpayload)
- [CloseChannelResponse](modules.md#closechannelresponse)
- [CreateTokenPayload](modules.md#createtokenpayload)
- [CreateTokenResponse](modules.md#createtokenresponse)
- [DeleteTokenPayload](modules.md#deletetokenpayload)
- [Error](modules.md#error)
- [FundChannelsPayload](modules.md#fundchannelspayload)
- [FundChannelsResponse](modules.md#fundchannelsresponse)
- [GetAliasResponse](modules.md#getaliasresponse)
- [GetAliasesResponse](modules.md#getaliasesresponse)
- [GetChannelPayload](modules.md#getchannelpayload)
- [GetChannelResponse](modules.md#getchannelresponse)
- [GetChannelTicketsResponse](modules.md#getchannelticketsresponse)
- [GetChannelsResponse](modules.md#getchannelsresponse)
- [GetEntryNodesResponse](modules.md#getentrynodesresponse)
- [GetInfoResponse](modules.md#getinforesponse)
- [GetPeerInfoPayload](modules.md#getpeerinfopayload)
- [GetPeerInfoResponse](modules.md#getpeerinforesponse)
- [GetPeersPayload](modules.md#getpeerspayload)
- [GetPeersResponse](modules.md#getpeersresponse)
- [GetSettingsResponse](modules.md#getsettingsresponse)
- [GetStatisticsResponse](modules.md#getstatisticsresponse)
- [GetTicketsResponse](modules.md#getticketsresponse)
- [GetTokenResponse](modules.md#gettokenresponse)
- [OpenChannelPayload](modules.md#openchannelpayload)
- [OpenChannelResponse](modules.md#openchannelresponse)
- [Peer](modules.md#peer)
- [PeerIdPayload](modules.md#peeridpayload)
- [PingNodePayload](modules.md#pingnodepayload)
- [PingNodeResponse](modules.md#pingnoderesponse)
- [SendMessagePayload](modules.md#sendmessagepayload)
- [SetAliasPayload](modules.md#setaliaspayload)
- [SetSettingPayload](modules.md#setsettingpayload)
- [SignPayload](modules.md#signpayload)
- [SignResponse](modules.md#signresponse)
- [Ticket](modules.md#ticket)
- [TokenCapability](modules.md#tokencapability)
- [WithdrawPayload](modules.md#withdrawpayload)
- [WithdrawResponse](modules.md#withdrawresponse)

## Type Aliases

### AccountResponseType

Ƭ **AccountResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hopr` | `string` |
| `native` | `string` |

#### Defined in

[src/types/account.ts:13](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/account.ts#L13)

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

[src/types/aliases.ts:12](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/aliases.ts#L12)

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

[src/types/general.ts:26](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/general.ts#L26)

___

### CloseChannelPayloadType

Ƭ **CloseChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `direction` | ``"incoming"`` \| ``"outgoing"`` | - |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:91](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L91)

___

### CloseChannelResponseType

Ƭ **CloseChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channelStatus` | `string` |
| `receipt?` | `string` |

#### Defined in

[src/types/channels.ts:98](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L98)

___

### CreateTokenPayloadType

Ƭ **CreateTokenPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `capabilities` | { `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: { type: string; conditions?: { max?: number \| undefined; } \| undefined; used?: number \| undefined; }[]  }[] | - |
| `description` | `string` | - |
| `lifetime` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/tokens.ts:75](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L75)

___

### CreateTokenResponseType

Ƭ **CreateTokenResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Defined in

[src/types/tokens.ts:81](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L81)

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

[src/types/tokens.ts:104](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L104)

___

### ErrorType

Ƭ **ErrorType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `string` |
| `status?` | `string` |

#### Defined in

[src/types/error.ts:8](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/error.ts#L8)

___

### FundChannelsPayloadType

Ƭ **FundChannelsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `incomingAmount` | `string` | - |
| `outgoingAmount` | `string` | - |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:24](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L24)

___

### FundChannelsResponseType

Ƭ **FundChannelsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipt` | `string` |

#### Defined in

[src/types/channels.ts:30](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L30)

___

### GetAliasResponseType

Ƭ **GetAliasResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `peerId` | `string` |

#### Defined in

[src/types/aliases.ts:39](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/aliases.ts#L39)

___

### GetAliasesResponseType

Ƭ **GetAliasesResponseType**: `Record`<`string`, `string`\>

#### Defined in

[src/types/aliases.ts:20](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/aliases.ts#L20)

___

### GetChannelPayloadType

Ƭ **GetChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `direction` | ``"incoming"`` \| ``"outgoing"`` | - |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:107](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L107)

___

### GetChannelResponseType

Ƭ **GetChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balance` | `string` |
| `channelId` | `string` |
| `peerId` | `string` |
| `status` | ``"WaitingForCommitment"`` \| ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` |
| `type` | ``"incoming"`` \| ``"outgoing"`` |

#### Defined in

[src/types/channels.ts:111](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L111)

___

### GetChannelTicketsResponseType

Ƭ **GetChannelTicketsResponseType**: { `amount`: `string` ; `challenge`: `string` ; `channelEpoch`: `string` ; `counterparty`: `string` ; `epoch`: `string` ; `index`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]

#### Defined in

[src/types/channels.ts:80](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L80)

___

### GetChannelsResponseType

Ƭ **GetChannelsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `incoming` | { type: "incoming" \| "outgoing"; status: "WaitingForCommitment" \| "Open" \| "PendingToClose" \| "Closed"; peerId: string; channelId: string; balance: string; }[] |
| `outgoing` | { type: "incoming" \| "outgoing"; status: "WaitingForCommitment" \| "Open" \| "PendingToClose" \| "Closed"; peerId: string; channelId: string; balance: string; }[] |

#### Defined in

[src/types/channels.ts:63](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L63)

___

### GetEntryNodesResponseType

Ƭ **GetEntryNodesResponseType**: `Record`<`string`, { `isEligible`: `boolean` ; `multiaddrs`: `string`[]  }\>

#### Defined in

[src/types/node.ts:63](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L63)

___

### GetInfoResponseType

Ƭ **GetInfoResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announcedAddress` | `string`[] |
| `channelClosurePeriod` | `number` |
| `connectivityStatus` | `string` |
| `environment` | `string` |
| `hoprChannels` | `string` |
| `hoprNetworkRegistryAddress?` | `string` |
| `hoprToken` | `string` |
| `isEligible` | `boolean` |
| `listeningAddress` | `string`[] |
| `network` | `string` |

#### Defined in

[src/types/node.ts:50](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L50)

___

### GetPeerInfoPayloadType

Ƭ **GetPeerInfoPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/peerInfo.ts:12](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/peerInfo.ts#L12)

___

### GetPeerInfoResponseType

Ƭ **GetPeerInfoResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announced` | `string`[] |
| `observed` | `string`[] |

#### Defined in

[src/types/peerInfo.ts:19](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/peerInfo.ts#L19)

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

[src/types/node.ts:12](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L12)

___

### GetPeersResponseType

Ƭ **GetPeersResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announced` | { peerId: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; }[] |
| `connected` | { peerId: string; quality: number; multiAddr: string; heartbeats: { sent: number; success: number; }; lastSeen: number; backoff: number; isNew: boolean; }[] |

#### Defined in

[src/types/node.ts:31](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L31)

___

### GetSettingsResponseType

Ƭ **GetSettingsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `includeRecipient` | `boolean` |
| `strategy` | `string` |

#### Defined in

[src/types/settings.ts:13](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/settings.ts#L13)

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

[src/types/tickets.ts:20](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tickets.ts#L20)

___

### GetTicketsResponseType

Ƭ **GetTicketsResponseType**: { `amount`: `string` ; `challenge`: `string` ; `channelEpoch`: `string` ; `counterparty`: `string` ; `epoch`: `string` ; `index`: `string` ; `signature`: `string` ; `winProb`: `string`  }[]

#### Defined in

[src/types/tickets.ts:39](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tickets.ts#L39)

___

### GetTokenResponseType

Ƭ **GetTokenResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `capabilities` | { endpoint: "accountWithdraw" \| "accountGetBalances" \| "accountGetAddresses" \| "aliasesGetAliases" \| "aliasesSetAlias" \| "aliasesGetAlias" \| "aliasesRemoveAlias" \| "channelsFundChannels" \| ... 23 more ... \| "tokensDelete"; limits: { ...; }[]; }[] |
| `description?` | `string` |
| `id` | `string` |
| `valid_until?` | `number` |

#### Defined in

[src/types/tokens.ts:94](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L94)

___

### OpenChannelPayloadType

Ƭ **OpenChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | - |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:39](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L39)

___

### OpenChannelResponseType

Ƭ **OpenChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `receipt` | `string` |

#### Defined in

[src/types/channels.ts:46](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L46)

___

### PeerIdPayloadType

Ƭ **PeerIdPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:12](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L12)

___

### PingNodePayloadType

Ƭ **PingNodePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/node.ts:73](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L73)

___

### PingNodeResponseType

Ƭ **PingNodeResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `latency` | `number` |

#### Defined in

[src/types/node.ts:79](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L79)

___

### RemoveBasicAuthenticationPayloadType

Ƭ **RemoveBasicAuthenticationPayloadType**<`T`\>: `Pick`<`T`, `Exclude`<keyof `T`, ``"apiEndpoint"`` \| ``"apiToken"`` \| ``"timeout"``\>\>

Removes the basic authentication properties from a payload type.

**`Typeparam`**

T - The payload type from which to remove the properties.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`BasePayloadType`](modules.md#basepayloadtype) |

#### Defined in

[src/types/general.ts:32](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/general.ts#L32)

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
| `recipient` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:29](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/messages.ts#L29)

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

[src/types/aliases.ts:31](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/aliases.ts#L31)

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

[src/types/settings.ts:24](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/settings.ts#L24)

___

### SignPayloadType

Ƭ **SignPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `message` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:12](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/messages.ts#L12)

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
| `recipient` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/account.ts:25](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/account.ts#L25)

## Variables

### AccountResponse

• `Const` **AccountResponse**: `ZodObject`<[`AccountResponseType`](modules.md#accountresponsetype)\>

General

#### Defined in

[src/types/account.ts:8](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/account.ts#L8)

___

### AliasPayload

• `Const` **AliasPayload**: `ZodObject`<[`AliasPayloadType`](modules.md#aliaspayloadtype)\>

General

#### Defined in

[src/types/aliases.ts:8](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/aliases.ts#L8)

___

### BasePayload

• `Const` **BasePayload**: `ZodObject`<[`BasePayloadType`](modules.md#basepayloadtype)\>

Represents the minimum payload needed to interact with hoprd node.

#### Defined in

[src/types/general.ts:6](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/general.ts#L6)

___

### Channel

• `Const` **Channel**: `ZodObject`<{ `balance`: `ZodString` ; `channelId`: `ZodString` ; `peerId`: `ZodString` ; `status`: `ZodEnum`<[``"WaitingForCommitment"``, ``"Open"``, ``"PendingToClose"``, ``"Closed"``]\> ; `type`: `ZodEnum`<[``"incoming"``, ``"outgoing"``]\>  }, ``"strip"``, `ZodTypeAny`, { `balance`: `string` ; `channelId`: `string` ; `peerId`: `string` ; `status`: ``"WaitingForCommitment"`` \| ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` ; `type`: ``"incoming"`` \| ``"outgoing"``  }, { `balance`: `string` ; `channelId`: `string` ; `peerId`: `string` ; `status`: ``"WaitingForCommitment"`` \| ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` ; `type`: ``"incoming"`` \| ``"outgoing"``  }\>

Get channels

#### Defined in

[src/types/channels.ts:50](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L50)

___

### CloseChannelPayload

• `Const` **CloseChannelPayload**: `ZodObject`<[`CloseChannelPayloadType`](modules.md#closechannelpayloadtype)\>

Close channel

#### Defined in

[src/types/channels.ts:86](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L86)

___

### CloseChannelResponse

• `Const` **CloseChannelResponse**: `ZodObject`<[`CloseChannelResponseType`](modules.md#closechannelresponsetype)\>

#### Defined in

[src/types/channels.ts:93](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L93)

___

### CreateTokenPayload

• `Const` **CreateTokenPayload**: `ZodObject`<[`CreateTokenPayloadType`](modules.md#createtokenpayloadtype)\>

createToken

#### Defined in

[src/types/tokens.ts:69](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L69)

___

### CreateTokenResponse

• `Const` **CreateTokenResponse**: `ZodObject`<[`CreateTokenResponseType`](modules.md#createtokenresponsetype)\>

#### Defined in

[src/types/tokens.ts:77](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L77)

___

### DeleteTokenPayload

• `Const` **DeleteTokenPayload**: `ZodObject`<[`DeleteTokenPayloadType`](modules.md#deletetokenpayloadtype)\>

deleteToken

#### Defined in

[src/types/tokens.ts:100](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L100)

___

### Error

• `Const` **Error**: `ZodObject`<[`ErrorType`](modules.md#errortype)\>

#### Defined in

[src/types/error.ts:3](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/error.ts#L3)

___

### FundChannelsPayload

• `Const` **FundChannelsPayload**: `ZodObject`<[`FundChannelsPayloadType`](modules.md#fundchannelspayloadtype)\>

Fund channel

#### Defined in

[src/types/channels.ts:18](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L18)

___

### FundChannelsResponse

• `Const` **FundChannelsResponse**: `ZodObject`<[`FundChannelsResponseType`](modules.md#fundchannelsresponsetype)\>

#### Defined in

[src/types/channels.ts:26](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L26)

___

### GetAliasResponse

• `Const` **GetAliasResponse**: `ZodObject`<[`GetAliasResponseType`](modules.md#getaliasresponsetype)\>

getAlias

#### Defined in

[src/types/aliases.ts:37](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/aliases.ts#L37)

___

### GetAliasesResponse

• `Const` **GetAliasesResponse**: `ZodRecord`<[`GetAliasesResponseType`](modules.md#getaliasesresponsetype)\>

getAliases

#### Defined in

[src/types/aliases.ts:18](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/aliases.ts#L18)

___

### GetChannelPayload

• `Const` **GetChannelPayload**: `ZodObject`<[`GetChannelPayloadType`](modules.md#getchannelpayloadtype)\>

Get channel

#### Defined in

[src/types/channels.ts:102](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L102)

___

### GetChannelResponse

• `Const` **GetChannelResponse**: `ZodObject`<[`GetChannelResponseType`](modules.md#getchannelresponsetype)\> = `Channel`

#### Defined in

[src/types/channels.ts:109](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L109)

___

### GetChannelTicketsResponse

• `Const` **GetChannelTicketsResponse**: `ZodArray`<[`GetChannelTicketsResponseType`](modules.md#getchannelticketsresponsetype)\>

#### Defined in

[src/types/channels.ts:78](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L78)

___

### GetChannelsResponse

• `Const` **GetChannelsResponse**: `ZodObject`<[`GetChannelsResponseType`](modules.md#getchannelsresponsetype)\>

#### Defined in

[src/types/channels.ts:58](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L58)

___

### GetEntryNodesResponse

• `Const` **GetEntryNodesResponse**: `ZodRecord`<[`GetEntryNodesResponseType`](modules.md#getentrynodesresponsetype)\>

#### Defined in

[src/types/node.ts:61](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L61)

___

### GetInfoResponse

• `Const` **GetInfoResponse**: `ZodObject`<[`GetInfoResponseType`](modules.md#getinforesponsetype)\>

Get Info

#### Defined in

[src/types/node.ts:37](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L37)

___

### GetPeerInfoPayload

• `Const` **GetPeerInfoPayload**: `ZodObject`<[`GetPeerInfoPayloadType`](modules.md#getpeerinfopayloadtype)\>

Get peer info

#### Defined in

[src/types/peerInfo.ts:8](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/peerInfo.ts#L8)

___

### GetPeerInfoResponse

• `Const` **GetPeerInfoResponse**: `ZodObject`<[`GetPeerInfoResponseType`](modules.md#getpeerinforesponsetype)\>

#### Defined in

[src/types/peerInfo.ts:14](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/peerInfo.ts#L14)

___

### GetPeersPayload

• `Const` **GetPeersPayload**: `ZodObject`<[`GetPeersPayloadType`](modules.md#getpeerspayloadtype)\>

Get peers

#### Defined in

[src/types/node.ts:8](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L8)

___

### GetPeersResponse

• `Const` **GetPeersResponse**: `ZodObject`<[`GetPeersResponseType`](modules.md#getpeersresponsetype)\>

#### Defined in

[src/types/node.ts:26](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L26)

___

### GetSettingsResponse

• `Const` **GetSettingsResponse**: `ZodObject`<[`GetSettingsResponseType`](modules.md#getsettingsresponsetype)\>

Get settings

#### Defined in

[src/types/settings.ts:8](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/settings.ts#L8)

___

### GetStatisticsResponse

• `Const` **GetStatisticsResponse**: `ZodObject`<[`GetStatisticsResponseType`](modules.md#getstatisticsresponsetype)\>

Get statistics

#### Defined in

[src/types/tickets.ts:7](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tickets.ts#L7)

___

### GetTicketsResponse

• `Const` **GetTicketsResponse**: `ZodArray`<[`GetTicketsResponseType`](modules.md#getticketsresponsetype)\>

Get tickets

#### Defined in

[src/types/tickets.ts:26](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tickets.ts#L26)

___

### GetTokenResponse

• `Const` **GetTokenResponse**: `ZodObject`<[`GetTokenResponseType`](modules.md#gettokenresponsetype)\>

getToken

#### Defined in

[src/types/tokens.ts:87](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L87)

___

### OpenChannelPayload

• `Const` **OpenChannelPayload**: `ZodObject`<[`OpenChannelPayloadType`](modules.md#openchannelpayloadtype)\>

Open channel

#### Defined in

[src/types/channels.ts:34](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L34)

___

### OpenChannelResponse

• `Const` **OpenChannelResponse**: `ZodObject`<[`OpenChannelResponseType`](modules.md#openchannelresponsetype)\>

#### Defined in

[src/types/channels.ts:41](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L41)

___

### Peer

• `Const` **Peer**: `ZodObject`<{ `backoff`: `ZodNumber` ; `heartbeats`: `ZodObject`<{ `sent`: `ZodNumber` ; `success`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, { `sent`: `number` ; `success`: `number`  }, { `sent`: `number` ; `success`: `number`  }\> ; `isNew`: `ZodBoolean` ; `lastSeen`: `ZodNumber` ; `multiAddr`: `ZodString` ; `peerId`: `ZodString` ; `quality`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, { `backoff`: `number` ; `heartbeats`: { sent: number; success: number; } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `multiAddr`: `string` ; `peerId`: `string` ; `quality`: `number`  }, { `backoff`: `number` ; `heartbeats`: { sent: number; success: number; } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `multiAddr`: `string` ; `peerId`: `string` ; `quality`: `number`  }\>

#### Defined in

[src/types/node.ts:14](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L14)

___

### PeerIdPayload

• `Const` **PeerIdPayload**: `ZodObject`<[`PeerIdPayloadType`](modules.md#peeridpayloadtype)\>

General types

#### Defined in

[src/types/channels.ts:8](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L8)

___

### PingNodePayload

• `Const` **PingNodePayload**: `ZodObject`<[`PingNodePayloadType`](modules.md#pingnodepayloadtype)\>

Ping node

#### Defined in

[src/types/node.ts:69](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L69)

___

### PingNodeResponse

• `Const` **PingNodeResponse**: `ZodObject`<[`PingNodeResponseType`](modules.md#pingnoderesponsetype)\>

#### Defined in

[src/types/node.ts:75](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/node.ts#L75)

___

### SendMessagePayload

• `Const` **SendMessagePayload**: `ZodObject`<[`SendMessagePayloadType`](modules.md#sendmessagepayloadtype)\>

sendMessage

#### Defined in

[src/types/messages.ts:22](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/messages.ts#L22)

___

### SetAliasPayload

• `Const` **SetAliasPayload**: `ZodObject`<[`SetAliasPayloadType`](modules.md#setaliaspayloadtype)\>

setAlias

#### Defined in

[src/types/aliases.ts:26](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/aliases.ts#L26)

___

### SetSettingPayload

• `Const` **SetSettingPayload**: `ZodObject`<[`SetSettingPayloadType`](modules.md#setsettingpayloadtype)\>

Set Setting

#### Defined in

[src/types/settings.ts:19](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/settings.ts#L19)

___

### SignPayload

• `Const` **SignPayload**: `ZodObject`<[`SignPayloadType`](modules.md#signpayloadtype)\>

sign

#### Defined in

[src/types/messages.ts:8](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/messages.ts#L8)

___

### SignResponse

• `Const` **SignResponse**: `ZodObject`<{ `signature`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `signature`: `string`  }, { `signature`: `string`  }\>

#### Defined in

[src/types/messages.ts:14](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/messages.ts#L14)

___

### Ticket

• `Const` **Ticket**: `ZodObject`<{ `amount`: `ZodString` ; `challenge`: `ZodString` ; `channelEpoch`: `ZodString` ; `counterparty`: `ZodString` ; `epoch`: `ZodString` ; `index`: `ZodString` ; `signature`: `ZodString` ; `winProb`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `amount`: `string` ; `challenge`: `string` ; `channelEpoch`: `string` ; `counterparty`: `string` ; `epoch`: `string` ; `index`: `string` ; `signature`: `string` ; `winProb`: `string`  }, { `amount`: `string` ; `challenge`: `string` ; `channelEpoch`: `string` ; `counterparty`: `string` ; `epoch`: `string` ; `index`: `string` ; `signature`: `string` ; `winProb`: `string`  }\>

Get tickets

#### Defined in

[src/types/channels.ts:67](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/channels.ts#L67)

___

### TokenCapability

• `Const` **TokenCapability**: `ZodObject`<{ `endpoint`: `ZodEnum`<[``"accountWithdraw"``, ``"accountGetBalances"``, ``"accountGetAddresses"``, ``"aliasesGetAliases"``, ``"aliasesSetAlias"``, ``"aliasesGetAlias"``, ``"aliasesRemoveAlias"``, ``"channelsFundChannels"``, ``"channelsOpenChannel"``, ``"channelsGetChannels"``]\> ; `limits`: `ZodArray`<`ZodObject`<{ `conditions`: `ZodOptional`<`ZodObject`<{ `max`: `ZodOptional`<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, { `max?`: `number`  }, { `max?`: `number`  }\>\> ; `type`: `ZodString` ; `used`: `ZodOptional`<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, { `conditions?`: { max?: number \| undefined; } ; `type`: `string` ; `used?`: `number`  }, { `conditions?`: { max?: number \| undefined; } ; `type`: `string` ; `used?`: `number`  }\>, ``"many"``\>  }, ``"strip"``, `ZodTypeAny`, { `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: { type: string; conditions?: { max?: number \| undefined; } \| undefined; used?: number \| undefined; }[]  }, { `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: { type: string; conditions?: { max?: number \| undefined; } \| undefined; used?: number \| undefined; }[]  }\>

#### Defined in

[src/types/tokens.ts:54](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/tokens.ts#L54)

___

### WithdrawPayload

• `Const` **WithdrawPayload**: `ZodObject`<[`WithdrawPayloadType`](modules.md#withdrawpayloadtype)\>

withdraw

#### Defined in

[src/types/account.ts:19](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/account.ts#L19)

___

### WithdrawResponse

• `Const` **WithdrawResponse**: `ZodObject`<{ `receipt`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, { `receipt`: `string`  }, { `receipt`: `string`  }\>

#### Defined in

[src/types/account.ts:27](https://github.com/hoprnet/hopr-sdk/blob/main/src/types/account.ts#L27)
