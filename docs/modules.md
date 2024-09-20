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

- [AggregateChannelTicketsPayloadType](modules.md#aggregatechannelticketspayloadtype)
- [AliasPayloadType](modules.md#aliaspayloadtype)
- [ApiErrorResponseType](modules.md#apierrorresponsetype)
- [BasePayloadType](modules.md#basepayloadtype)
- [ChainPayloadType](modules.md#chainpayloadtype)
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
- [GetConfigurationPayloadType](modules.md#getconfigurationpayloadtype)
- [GetConfigurationResponseType](modules.md#getconfigurationresponsetype)
- [GetEntryNodesResponseType](modules.md#getentrynodesresponsetype)
- [GetInfoResponseType](modules.md#getinforesponsetype)
- [GetMessagesSizePayloadType](modules.md#getmessagessizepayloadtype)
- [GetMessagesSizeResponseType](modules.md#getmessagessizeresponsetype)
- [GetPeerPayloadType](modules.md#getpeerpayloadtype)
- [GetPeerResponseType](modules.md#getpeerresponsetype)
- [GetPeersPayloadType](modules.md#getpeerspayloadtype)
- [GetPeersResponseType](modules.md#getpeersresponsetype)
- [GetTicketPricePayloadType](modules.md#getticketpricepayloadtype)
- [GetTicketPriceResponseType](modules.md#getticketpriceresponsetype)
- [GetTicketStatisticsResponseType](modules.md#getticketstatisticsresponsetype)
- [GetTokenResponseType](modules.md#gettokenresponsetype)
- [IsNodeHealthyPayloadType](modules.md#isnodehealthypayloadtype)
- [IsNodeHealthyResponseType](modules.md#isnodehealthyresponsetype)
- [IsNodeReadyPayloadType](modules.md#isnodereadypayloadtype)
- [IsNodeReadyResponseType](modules.md#isnodereadyresponsetype)
- [IsNodeStartedPayloadType](modules.md#isnodestartedpayloadtype)
- [IsNodeStartedResponseType](modules.md#isnodestartedresponsetype)
- [NetworkPayloadType](modules.md#networkpayloadtype)
- [OpenChannelPayloadType](modules.md#openchannelpayloadtype)
- [OpenChannelResponseType](modules.md#openchannelresponsetype)
- [PeekAllMessagesPayloadType](modules.md#peekallmessagespayloadtype)
- [PeekAllMessagesResponseType](modules.md#peekallmessagesresponsetype)
- [PeekMessagePayloadType](modules.md#peekmessagepayloadtype)
- [PeekMessageResponseType](modules.md#peekmessageresponsetype)
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
- [StrategiesPayloadType](modules.md#strategiespayloadtype)
- [WithdrawPayloadType](modules.md#withdrawpayloadtype)
- [createWsUrlType](modules.md#createwsurltype)

### Variables

- [AggregateChannelTicketsPayload](modules.md#aggregatechannelticketspayload)
- [AliasPayload](modules.md#aliaspayload)
- [ApiErrorResponse](modules.md#apierrorresponse)
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
- [GetConfigurationPayload](modules.md#getconfigurationpayload)
- [GetConfigurationResponse](modules.md#getconfigurationresponse)
- [GetEntryNodesResponse](modules.md#getentrynodesresponse)
- [GetInfoResponse](modules.md#getinforesponse)
- [GetMessagesSizePayload](modules.md#getmessagessizepayload)
- [GetMessagesSizeResponse](modules.md#getmessagessizeresponse)
- [GetPeerPayload](modules.md#getpeerpayload)
- [GetPeerResponse](modules.md#getpeerresponse)
- [GetPeersPayload](modules.md#getpeerspayload)
- [GetPeersResponse](modules.md#getpeersresponse)
- [GetTicketPricePayload](modules.md#getticketpricepayload)
- [GetTicketPriceResponse](modules.md#getticketpriceresponse)
- [GetTicketStatisticsResponse](modules.md#getticketstatisticsresponse)
- [GetTokenResponse](modules.md#gettokenresponse)
- [IsNodeHealthyPayload](modules.md#isnodehealthypayload)
- [IsNodeHealthyResponse](modules.md#isnodehealthyresponse)
- [IsNodeReadyPayload](modules.md#isnodereadypayload)
- [IsNodeReadyResponse](modules.md#isnodereadyresponse)
- [IsNodeStartedPayload](modules.md#isnodestartedpayload)
- [IsNodeStartedResponse](modules.md#isnodestartedresponse)
- [OpenChannelPayload](modules.md#openchannelpayload)
- [OpenChannelResponse](modules.md#openchannelresponse)
- [PeekAllMessagesPayload](modules.md#peekallmessagespayload)
- [PeekAllMessagesResponse](modules.md#peekallmessagesresponse)
- [PeekMessagePayload](modules.md#peekmessagepayload)
- [PeekMessageResponse](modules.md#peekmessageresponse)
- [PeerAnnounced](modules.md#peerannounced)
- [PeerConnected](modules.md#peerconnected)
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
- [Ticket](modules.md#ticket)
- [TokenCapability](modules.md#tokencapability)
- [WithdrawPayload](modules.md#withdrawpayload)
- [WithdrawResponse](modules.md#withdrawresponse)
- [createWsUrlPayload](modules.md#createwsurlpayload)

## Type Aliases

### AggregateChannelTicketsPayloadType

Ƭ **AggregateChannelTicketsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:48](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L48)

___

### AliasPayloadType

Ƭ **AliasPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `alias` | `string` | - |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/aliases.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/aliases.ts#L12)

___

### ApiErrorResponseType

Ƭ **ApiErrorResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `string` |
| `status` | `string` |

#### Defined in

[src/types/ApiErrorResponse.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/ApiErrorResponse.ts#L8)

___

### BasePayloadType

Ƭ **BasePayloadType**: `Object`

Represents the inferred TypeScript type from BasicAuthenticationPayload.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/general.ts:26](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/general.ts#L26)

___

### ChainPayloadType

Ƭ **ChainPayloadType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `block_time` | ``null`` \| `number` |
| `chain_id` | `number` |
| `default_provider` | ``null`` \| `string` |
| `description` | ``null`` \| `string` |
| `etherscan_api_url` | ``null`` \| `string` |
| `hopr_token_name` | ``null`` \| `string` |
| `live` | `boolean` |
| `max_fee_per_gas` | ``null`` \| `string` |
| `max_priority_fee_per_gas` | ``null`` \| `string` |
| `native_token_name` | ``null`` \| `string` |
| `tags` | ``null`` \| `string`[] |

#### Defined in

[src/types/configuration.ts:53](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/configuration.ts#L53)

___

### CloseChannelPayloadType

Ƭ **CloseChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:134](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L134)

___

### CloseChannelResponseType

Ƭ **CloseChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channelStatus` | ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` |
| `receipt` | `string` |

#### Defined in

[src/types/channels.ts:141](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L141)

___

### CreateTokenPayloadType

Ƭ **CreateTokenPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `capabilities` | \{ `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }[]  }[] | - |
| `description` | `string` | - |
| `lifetime` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/tokens.ts:77](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L77)

___

### CreateTokenResponseType

Ƭ **CreateTokenResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Defined in

[src/types/tokens.ts:83](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L83)

___

### DeleteMessagesPayloadType

Ƭ **DeleteMessagesPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag?` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:34](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L34)

___

### DeleteTokenPayloadType

Ƭ **DeleteTokenPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `id` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/tokens.ts:106](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L106)

___

### FundChannelsPayloadType

Ƭ **FundChannelsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | - |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:61](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L61)

___

### FundChannelsResponseType

Ƭ **FundChannelsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipt` | `string` |

#### Defined in

[src/types/channels.ts:67](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L67)

___

### GetAddressesResponseType

Ƭ **GetAddressesResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hopr` | `string` |
| `native` | `string` |

#### Defined in

[src/types/account.ts:27](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/account.ts#L27)

___

### GetAliasResponseType

Ƭ **GetAliasResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `peerId` | `string` |

#### Defined in

[src/types/aliases.ts:39](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/aliases.ts#L39)

___

### GetAliasesResponseType

Ƭ **GetAliasesResponseType**: `Record`\<`string`, `string`\>

#### Defined in

[src/types/aliases.ts:20](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/aliases.ts#L20)

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

[src/types/account.ts:16](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/account.ts#L16)

___

### GetChannelPayloadType

Ƭ **GetChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:149](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L149)

___

### GetChannelResponseType

Ƭ **GetChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `balance` | `string` |
| `channelEpoch` | `number` |
| `channelId` | `string` |
| `closureTime` | `number` |
| `destinationAddress` | `string` |
| `destinationPeerId` | `string` |
| `sourceAddress` | `string` |
| `sourcePeerId` | `string` |
| `status` | ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` |
| `ticketIndex` | `string` |

#### Defined in

[src/types/channels.ts:153](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L153)

___

### GetChannelTicketsPayloadType

Ƭ **GetChannelTicketsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:108](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L108)

___

### GetChannelTicketsResponseType

Ƭ **GetChannelTicketsResponseType**: \{ `amount`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `index`: `number` ; `indexOffset`: `number` ; `signature`: `string` ; `winProb`: `string`  }[]

#### Defined in

[src/types/channels.ts:124](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L124)

___

### GetChannelsPayloadType

Ƭ **GetChannelsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `fullTopology?` | `boolean` | - |
| `includingClosed?` | `boolean` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:92](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L92)

___

### GetChannelsResponseType

Ƭ **GetChannelsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `all` | \{ `balance`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `closureTime`: `number` ; `destinationAddress`: `string` ; `destinationPeerId`: `string` ; `sourceAddress`: `string` ; `sourcePeerId`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `ticketIndex`: `string`  }[] |
| `incoming` | \{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus }[] |
| `outgoing` | \{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus }[] |

#### Defined in

[src/types/channels.ts:100](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L100)

___

### GetConfigurationPayloadType

Ƭ **GetConfigurationPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/configuration.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/configuration.ts#L10)

___

### GetConfigurationResponseType

Ƭ **GetConfigurationResponseType**: `any`

#### Defined in

[src/types/configuration.ts:164](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/configuration.ts#L164)

___

### GetEntryNodesResponseType

Ƭ **GetEntryNodesResponseType**: `Record`\<`string`, \{ `isEligible`: `boolean` ; `multiaddrs`: `string`[]  }\>

#### Defined in

[src/types/node.ts:79](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L79)

___

### GetInfoResponseType

Ƭ **GetInfoResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announcedAddress` | `string`[] |
| `chain` | `string` |
| `channelClosurePeriod` | `number` |
| `connectivityStatus` | ``"Unknown"`` \| ``"Red"`` \| ``"Orange"`` \| ``"Yellow"`` \| ``"Green"`` |
| `hoprChannels` | `string` |
| `hoprManagementModule` | `string` |
| `hoprNetworkRegistry?` | `string` |
| `hoprNodeSafe` | `string` |
| `hoprNodeSafeRegistry?` | `string` |
| `hoprToken` | `string` |
| `indexBlockPrevChecksum?` | `number` |
| `indexerBlock?` | `number` |
| `indexerChecksum?` | `string` |
| `isEligible` | `boolean` |
| `listeningAddress` | `string`[] |
| `network` | `string` |

#### Defined in

[src/types/node.ts:66](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L66)

___

### GetMessagesSizePayloadType

Ƭ **GetMessagesSizePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:42](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L42)

___

### GetMessagesSizeResponseType

Ƭ **GetMessagesSizeResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Defined in

[src/types/messages.ts:48](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L48)

___

### GetPeerPayloadType

Ƭ **GetPeerPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/peers.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/peers.ts#L12)

___

### GetPeerResponseType

Ƭ **GetPeerResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announced` | `string`[] |
| `observed` | `string`[] |

#### Defined in

[src/types/peers.ts:19](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/peers.ts#L19)

___

### GetPeersPayloadType

Ƭ **GetPeersPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `quality?` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/node.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L12)

___

### GetPeersResponseType

Ƭ **GetPeersResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `announced` | \{ `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string`  }[] |
| `connected` | \{ `backoff`: `number` ; `heartbeats`: \{ `sent`: `number` ; `success`: `number`  } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `lastSeenLatency`: `number` ; `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string` ; `quality`: `number` ; `reportedVersion`: `string`  }[] |

#### Defined in

[src/types/node.ts:41](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L41)

___

### GetTicketPricePayloadType

Ƭ **GetTicketPricePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/network.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/network.ts#L10)

___

### GetTicketPriceResponseType

Ƭ **GetTicketPriceResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `price` | `string` |

#### Defined in

[src/types/network.ts:16](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/network.ts#L16)

___

### GetTicketStatisticsResponseType

Ƭ **GetTicketStatisticsResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `neglectedValue` | `string` |
| `redeemedValue` | `string` |
| `rejectedValue` | `string` |
| `unredeemedValue` | `string` |
| `winningCount` | `number` |

#### Defined in

[src/types/tickets.ts:15](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tickets.ts#L15)

___

### GetTokenResponseType

Ƭ **GetTokenResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `capabilities` | \{ `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }[]  }[] |
| `description?` | `string` |
| `id` | `string` |
| `valid_until?` | `number` |

#### Defined in

[src/types/tokens.ts:96](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L96)

___

### IsNodeHealthyPayloadType

Ƭ **IsNodeHealthyPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/checks.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L10)

___

### IsNodeHealthyResponseType

Ƭ **IsNodeHealthyResponseType**: `boolean`

#### Defined in

[src/types/checks.ts:14](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L14)

___

### IsNodeReadyPayloadType

Ƭ **IsNodeReadyPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/checks.ts:22](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L22)

___

### IsNodeReadyResponseType

Ƭ **IsNodeReadyResponseType**: `boolean`

#### Defined in

[src/types/checks.ts:26](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L26)

___

### IsNodeStartedPayloadType

Ƭ **IsNodeStartedPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/checks.ts:34](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L34)

___

### IsNodeStartedResponseType

Ƭ **IsNodeStartedResponseType**: `boolean`

#### Defined in

[src/types/checks.ts:38](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L38)

___

### NetworkPayloadType

Ƭ **NetworkPayloadType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addresses` | \{ `announcements`: `string` ; `channels`: `string` ; `module_implementation`: `string` ; `network_registry`: `string` ; `network_registry_proxy`: `string` ; `node_safe_registry`: `string` ; `node_stake_v2_factory`: `string` ; `ticket_price_oracle`: `string` ; `token`: `string`  } |
| `addresses.announcements` | `string` |
| `addresses.channels` | `string` |
| `addresses.module_implementation` | `string` |
| `addresses.network_registry` | `string` |
| `addresses.network_registry_proxy` | `string` |
| `addresses.node_safe_registry` | `string` |
| `addresses.node_stake_v2_factory` | `string` |
| `addresses.ticket_price_oracle` | `string` |
| `addresses.token` | `string` |
| `chain` | `string` |
| `confirmations` | `number` |
| `environment_type` | `string` |
| `indexer_start_block_number` | `number` |
| `max_block_range` | `number` |
| `tags` | ``null`` \| `string`[] |
| `tx_polling_interval` | `number` |
| `version_range` | `string` |

#### Defined in

[src/types/configuration.ts:36](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/configuration.ts#L36)

___

### OpenChannelPayloadType

Ƭ **OpenChannelPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | - |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerAddress` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:76](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L76)

___

### OpenChannelResponseType

Ƭ **OpenChannelResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channelId` | `string` |
| `transactionReceipt` | `string` |

#### Defined in

[src/types/channels.ts:83](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L83)

___

### PeekAllMessagesPayloadType

Ƭ **PeekAllMessagesPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag?` | ``null`` \| `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:96](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L96)

___

### PeekAllMessagesResponseType

Ƭ **PeekAllMessagesResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messages` | \{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }[] |

#### Defined in

[src/types/messages.ts:102](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L102)

___

### PeekMessagePayloadType

Ƭ **PeekMessagePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag?` | ``null`` \| `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:84](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L84)

___

### PeekMessageResponseType

Ƭ **PeekMessageResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | `string` |
| `receivedAt` | `number` |
| `tag` | `number` |

#### Defined in

[src/types/messages.ts:88](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L88)

___

### PingPeerPayloadType

Ƭ **PingPeerPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/peers.ts:29](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/peers.ts#L29)

___

### PingPeerResponseType

Ƭ **PingPeerResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `latency` | `number` |
| `reportedVersion` | `string` |

#### Defined in

[src/types/peers.ts:36](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/peers.ts#L36)

___

### PopAllMessagesPayloadType

Ƭ **PopAllMessagesPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag?` | ``null`` \| `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:70](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L70)

___

### PopAllMessagesResponseType

Ƭ **PopAllMessagesResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `messages` | \{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }[] |

#### Defined in

[src/types/messages.ts:76](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L76)

___

### PopMessagePayloadType

Ƭ **PopMessagePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `tag?` | ``null`` \| `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:58](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L58)

___

### PopMessageResponseType

Ƭ **PopMessageResponseType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `body` | `string` |
| `receivedAt` | `number` |
| `tag` | `number` |

#### Defined in

[src/types/messages.ts:62](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L62)

___

### RedeemChannelTicketsPayloadType

Ƭ **RedeemChannelTicketsPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `channelId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/channels.ts:36](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L36)

___

### RemoveBasicAuthenticationPayloadType

Ƭ **RemoveBasicAuthenticationPayloadType**\<`T`\>: `Pick`\<`T`, `Exclude`\<keyof `T`, ``"apiEndpoint"`` \| ``"apiToken"``\>\>

Removes the basic authentication properties from a payload type.

**`Typeparam`**

T - The payload type from which to remove the properties.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`BasePayloadType`](modules.md#basepayloadtype) |

#### Defined in

[src/types/general.ts:32](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/general.ts#L32)

___

### SendMessagePayloadType

Ƭ **SendMessagePayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `body` | `string` | - |
| `hops?` | `number` | - |
| `path?` | `string`[] | - |
| `peerId` | `string` | - |
| `tag` | `number` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/messages.ts:26](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L26)

___

### SetAliasPayloadType

Ƭ **SetAliasPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `alias` | `string` | - |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `peerId` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/aliases.ts:31](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/aliases.ts#L31)

___

### StrategiesPayloadType

Ƭ **StrategiesPayloadType**: `Record`\<`string`, `Record`\<`string`, `string` \| `number` \| `boolean`\>\>

#### Defined in

[src/types/configuration.ts:61](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/configuration.ts#L61)

___

### WithdrawPayloadType

Ƭ **WithdrawPayloadType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `string` | - |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `currency` | ``"NATIVE"`` \| ``"HOPR"`` | - |
| `ethereumAddress` | `string` | - |
| `timeout?` | `number` | optional timeout for the requests |

#### Defined in

[src/types/account.ts:39](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/account.ts#L39)

___

### createWsUrlType

Ƭ **createWsUrlType**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `apiEndpoint` | `string` \| `URL` & `undefined` \| `string` \| `URL` | The API endpoint for authentication. |
| `apiToken` | `string` | The API token for authentication. |
| `path?` | `string` | optional path for the websocker |

#### Defined in

[src/types/websocket.ts:24](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/websocket.ts#L24)

## Variables

### AggregateChannelTicketsPayload

• `Const` **AggregateChannelTicketsPayload**: `ZodObject`\<\{ `apiEndpoint`: `ZodUnion`\<[`ZodString`, `ZodType`\<`URL`, `ZodTypeDef`, `URL`\>]\> ; `apiToken`: `ZodString` ; `channelId`: `ZodString` ; `timeout`: `ZodOptional`\<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, \{ `apiEndpoint`: `string` \| `URL` & `undefined` \| `string` \| `URL` ; `apiToken`: `string` ; `channelId`: `string` ; `timeout?`: `number`  }, \{ `apiEndpoint`: `string` \| `URL` & `undefined` \| `string` \| `URL` ; `apiToken`: `string` ; `channelId`: `string` ; `timeout?`: `number`  }\>

Aggregate channel tickets

#### Defined in

[src/types/channels.ts:44](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L44)

___

### AliasPayload

• `Const` **AliasPayload**: `ZodObject`\<[`AliasPayloadType`](modules.md#aliaspayloadtype)\>

General

#### Defined in

[src/types/aliases.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/aliases.ts#L8)

___

### ApiErrorResponse

• `Const` **ApiErrorResponse**: `ZodObject`\<[`ApiErrorResponseType`](modules.md#apierrorresponsetype)\>

#### Defined in

[src/types/ApiErrorResponse.ts:3](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/ApiErrorResponse.ts#L3)

___

### BasePayload

• `Const` **BasePayload**: `ZodObject`\<[`BasePayloadType`](modules.md#basepayloadtype)\>

Represents the minimum payload needed to interact with hoprd node.

#### Defined in

[src/types/general.ts:6](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/general.ts#L6)

___

### Channel

• `Const` **Channel**: `ZodObject`\<\{ `balance`: `ZodString` ; `id`: `ZodString` ; `peerAddress`: `ZodString` ; `status`: `ZodEnum`\<[``"Open"``, ``"PendingToClose"``, ``"Closed"``]\> = ChannelStatus }, ``"strip"``, `ZodTypeAny`, \{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus }, \{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus }\>

#### Defined in

[src/types/channels.ts:21](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L21)

___

### CloseChannelPayload

• `Const` **CloseChannelPayload**: `ZodObject`\<[`CloseChannelPayloadType`](modules.md#closechannelpayloadtype)\>

Close channel

#### Defined in

[src/types/channels.ts:130](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L130)

___

### CloseChannelResponse

• `Const` **CloseChannelResponse**: `ZodObject`\<[`CloseChannelResponseType`](modules.md#closechannelresponsetype)\>

#### Defined in

[src/types/channels.ts:136](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L136)

___

### CreateTokenPayload

• `Const` **CreateTokenPayload**: `ZodObject`\<[`CreateTokenPayloadType`](modules.md#createtokenpayloadtype)\>

createToken

#### Defined in

[src/types/tokens.ts:71](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L71)

___

### CreateTokenResponse

• `Const` **CreateTokenResponse**: `ZodObject`\<[`CreateTokenResponseType`](modules.md#createtokenresponsetype)\>

#### Defined in

[src/types/tokens.ts:79](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L79)

___

### DeleteMessagesPayload

• `Const` **DeleteMessagesPayload**: `ZodObject`\<[`DeleteMessagesPayloadType`](modules.md#deletemessagespayloadtype)\>

Delete Messages

#### Defined in

[src/types/messages.ts:30](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L30)

___

### DeleteTokenPayload

• `Const` **DeleteTokenPayload**: `ZodObject`\<[`DeleteTokenPayloadType`](modules.md#deletetokenpayloadtype)\>

deleteToken

#### Defined in

[src/types/tokens.ts:102](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L102)

___

### FundChannelsPayload

• `Const` **FundChannelsPayload**: `ZodObject`\<[`FundChannelsPayloadType`](modules.md#fundchannelspayloadtype)\>

Fund channel

#### Defined in

[src/types/channels.ts:56](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L56)

___

### FundChannelsResponse

• `Const` **FundChannelsResponse**: `ZodObject`\<[`FundChannelsResponseType`](modules.md#fundchannelsresponsetype)\>

#### Defined in

[src/types/channels.ts:63](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L63)

___

### GetAddressesResponse

• `Const` **GetAddressesResponse**: `ZodObject`\<[`GetAddressesResponseType`](modules.md#getaddressesresponsetype)\>

addresses

#### Defined in

[src/types/account.ts:22](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/account.ts#L22)

___

### GetAliasResponse

• `Const` **GetAliasResponse**: `ZodObject`\<[`GetAliasResponseType`](modules.md#getaliasresponsetype)\>

getAlias

#### Defined in

[src/types/aliases.ts:37](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/aliases.ts#L37)

___

### GetAliasesResponse

• `Const` **GetAliasesResponse**: `ZodRecord`\<[`GetAliasesResponseType`](modules.md#getaliasesresponsetype)\>

getAliases

#### Defined in

[src/types/aliases.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/aliases.ts#L18)

___

### GetBalancesResponse

• `Const` **GetBalancesResponse**: `ZodObject`\<[`GetBalancesResponseType`](modules.md#getbalancesresponsetype)\>

balances

#### Defined in

[src/types/account.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/account.ts#L8)

___

### GetChannelPayload

• `Const` **GetChannelPayload**: `ZodObject`\<[`GetChannelPayloadType`](modules.md#getchannelpayloadtype)\>

Get channel

#### Defined in

[src/types/channels.ts:145](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L145)

___

### GetChannelResponse

• `Const` **GetChannelResponse**: `ZodObject`\<[`GetChannelResponseType`](modules.md#getchannelresponsetype)\> = `TopologyChannel`

#### Defined in

[src/types/channels.ts:151](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L151)

___

### GetChannelTicketsPayload

• `Const` **GetChannelTicketsPayload**: `ZodObject`\<[`GetChannelTicketsPayloadType`](modules.md#getchannelticketspayloadtype)\>

Get channel tickets

#### Defined in

[src/types/channels.ts:104](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L104)

___

### GetChannelTicketsResponse

• `Const` **GetChannelTicketsResponse**: `ZodArray`\<[`GetChannelTicketsResponseType`](modules.md#getchannelticketsresponsetype)\>

#### Defined in

[src/types/channels.ts:122](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L122)

___

### GetChannelsPayload

• `Const` **GetChannelsPayload**: `ZodObject`\<[`GetChannelsPayloadType`](modules.md#getchannelspayloadtype)\>

Get channels

#### Defined in

[src/types/channels.ts:87](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L87)

___

### GetChannelsResponse

• `Const` **GetChannelsResponse**: `ZodObject`\<[`GetChannelsResponseType`](modules.md#getchannelsresponsetype)\>

#### Defined in

[src/types/channels.ts:94](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L94)

___

### GetConfigurationPayload

• `Const` **GetConfigurationPayload**: `ZodObject`\<[`GetConfigurationPayloadType`](modules.md#getconfigurationpayloadtype)\> = `BasePayload`

Get node configuration

#### Defined in

[src/types/configuration.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/configuration.ts#L8)

___

### GetConfigurationResponse

• `Const` **GetConfigurationResponse**: `ZodAny`\<[`GetConfigurationResponseType`](modules.md#getconfigurationresponsetype)\>

#### Defined in

[src/types/configuration.ts:63](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/configuration.ts#L63)

___

### GetEntryNodesResponse

• `Const` **GetEntryNodesResponse**: `ZodRecord`\<[`GetEntryNodesResponseType`](modules.md#getentrynodesresponsetype)\>

#### Defined in

[src/types/node.ts:77](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L77)

___

### GetInfoResponse

• `Const` **GetInfoResponse**: `ZodObject`\<[`GetInfoResponseType`](modules.md#getinforesponsetype)\>

Get Info

#### Defined in

[src/types/node.ts:47](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L47)

___

### GetMessagesSizePayload

• `Const` **GetMessagesSizePayload**: `ZodObject`\<[`GetMessagesSizePayloadType`](modules.md#getmessagessizepayloadtype)\>

Get Messages Size

#### Defined in

[src/types/messages.ts:38](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L38)

___

### GetMessagesSizeResponse

• `Const` **GetMessagesSizeResponse**: `ZodObject`\<[`GetMessagesSizeResponseType`](modules.md#getmessagessizeresponsetype)\>

#### Defined in

[src/types/messages.ts:44](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L44)

___

### GetPeerPayload

• `Const` **GetPeerPayload**: `ZodObject`\<[`GetPeerPayloadType`](modules.md#getpeerpayloadtype)\>

Get peer

#### Defined in

[src/types/peers.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/peers.ts#L8)

___

### GetPeerResponse

• `Const` **GetPeerResponse**: `ZodObject`\<[`GetPeerResponseType`](modules.md#getpeerresponsetype)\>

#### Defined in

[src/types/peers.ts:14](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/peers.ts#L14)

___

### GetPeersPayload

• `Const` **GetPeersPayload**: `ZodObject`\<[`GetPeersPayloadType`](modules.md#getpeerspayloadtype)\>

Get peers

#### Defined in

[src/types/node.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L8)

___

### GetPeersResponse

• `Const` **GetPeersResponse**: `ZodObject`\<[`GetPeersResponseType`](modules.md#getpeersresponsetype)\>

#### Defined in

[src/types/node.ts:36](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L36)

___

### GetTicketPricePayload

• `Const` **GetTicketPricePayload**: `ZodObject`\<[`GetTicketPricePayloadType`](modules.md#getticketpricepayloadtype)\> = `BasePayload`

Get network price

#### Defined in

[src/types/network.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/network.ts#L8)

___

### GetTicketPriceResponse

• `Const` **GetTicketPriceResponse**: `ZodObject`\<[`GetTicketPriceResponseType`](modules.md#getticketpriceresponsetype)\>

#### Defined in

[src/types/network.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/network.ts#L12)

___

### GetTicketStatisticsResponse

• `Const` **GetTicketStatisticsResponse**: `ZodObject`\<[`GetTicketStatisticsResponseType`](modules.md#getticketstatisticsresponsetype)\>

Get statistics

#### Defined in

[src/types/tickets.ts:7](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tickets.ts#L7)

___

### GetTokenResponse

• `Const` **GetTokenResponse**: `ZodObject`\<[`GetTokenResponseType`](modules.md#gettokenresponsetype)\>

getToken

#### Defined in

[src/types/tokens.ts:89](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L89)

___

### IsNodeHealthyPayload

• `Const` **IsNodeHealthyPayload**: `ZodObject`\<[`IsNodeHealthyPayloadType`](modules.md#isnodehealthypayloadtype)\> = `BasePayload`

Check whether the node is healthy

#### Defined in

[src/types/checks.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L8)

___

### IsNodeHealthyResponse

• `Const` **IsNodeHealthyResponse**: `ZodBoolean`\<[`IsNodeHealthyResponseType`](modules.md#isnodehealthyresponsetype)\>

#### Defined in

[src/types/checks.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L12)

___

### IsNodeReadyPayload

• `Const` **IsNodeReadyPayload**: `ZodObject`\<[`IsNodeReadyPayloadType`](modules.md#isnodereadypayloadtype)\> = `BasePayload`

Check whether the node is ready to accept connections.

#### Defined in

[src/types/checks.ts:20](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L20)

___

### IsNodeReadyResponse

• `Const` **IsNodeReadyResponse**: `ZodBoolean`\<[`IsNodeReadyResponseType`](modules.md#isnodereadyresponsetype)\>

#### Defined in

[src/types/checks.ts:24](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L24)

___

### IsNodeStartedPayload

• `Const` **IsNodeStartedPayload**: `ZodObject`\<[`IsNodeStartedPayloadType`](modules.md#isnodestartedpayloadtype)\> = `BasePayload`

Check whether the node is ready to accept connections.

#### Defined in

[src/types/checks.ts:32](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L32)

___

### IsNodeStartedResponse

• `Const` **IsNodeStartedResponse**: `ZodBoolean`\<[`IsNodeStartedResponseType`](modules.md#isnodestartedresponsetype)\>

#### Defined in

[src/types/checks.ts:36](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/checks.ts#L36)

___

### OpenChannelPayload

• `Const` **OpenChannelPayload**: `ZodObject`\<[`OpenChannelPayloadType`](modules.md#openchannelpayloadtype)\>

Open channel

#### Defined in

[src/types/channels.ts:71](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L71)

___

### OpenChannelResponse

• `Const` **OpenChannelResponse**: `ZodObject`\<[`OpenChannelResponseType`](modules.md#openchannelresponsetype)\>

#### Defined in

[src/types/channels.ts:78](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L78)

___

### PeekAllMessagesPayload

• `Const` **PeekAllMessagesPayload**: `ZodObject`\<[`PeekAllMessagesPayloadType`](modules.md#peekallmessagespayloadtype)\>

Peek all messages

#### Defined in

[src/types/messages.ts:92](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L92)

___

### PeekAllMessagesResponse

• `Const` **PeekAllMessagesResponse**: `ZodObject`\<[`PeekAllMessagesResponseType`](modules.md#peekallmessagesresponsetype)\>

#### Defined in

[src/types/messages.ts:98](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L98)

___

### PeekMessagePayload

• `Const` **PeekMessagePayload**: `ZodObject`\<[`PeekMessagePayloadType`](modules.md#peekmessagepayloadtype)\>

Peek message

#### Defined in

[src/types/messages.ts:80](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L80)

___

### PeekMessageResponse

• `Const` **PeekMessageResponse**: `ZodObject`\<[`PeekMessageResponseType`](modules.md#peekmessageresponsetype)\> = `ReceivedMessage`

#### Defined in

[src/types/messages.ts:86](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L86)

___

### PeerAnnounced

• `Const` **PeerAnnounced**: `ZodObject`\<\{ `multiaddr`: `ZodNullable`\<`ZodString`\> ; `peerAddress`: `ZodString` ; `peerId`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, \{ `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string`  }, \{ `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string`  }\>

#### Defined in

[src/types/node.ts:30](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L30)

___

### PeerConnected

• `Const` **PeerConnected**: `ZodObject`\<\{ `backoff`: `ZodNumber` ; `heartbeats`: `ZodObject`\<\{ `sent`: `ZodNumber` ; `success`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, \{ `sent`: `number` ; `success`: `number`  }, \{ `sent`: `number` ; `success`: `number`  }\> ; `isNew`: `ZodBoolean` ; `lastSeen`: `ZodNumber` ; `lastSeenLatency`: `ZodNumber` ; `multiaddr`: `ZodNullable`\<`ZodString`\> ; `peerAddress`: `ZodString` ; `peerId`: `ZodString` ; `quality`: `ZodNumber` ; `reportedVersion`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, \{ `backoff`: `number` ; `heartbeats`: \{ `sent`: `number` ; `success`: `number`  } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `lastSeenLatency`: `number` ; `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string` ; `quality`: `number` ; `reportedVersion`: `string`  }, \{ `backoff`: `number` ; `heartbeats`: \{ `sent`: `number` ; `success`: `number`  } ; `isNew`: `boolean` ; `lastSeen`: `number` ; `lastSeenLatency`: `number` ; `multiaddr`: ``null`` \| `string` ; `peerAddress`: `string` ; `peerId`: `string` ; `quality`: `number` ; `reportedVersion`: `string`  }\>

#### Defined in

[src/types/node.ts:14](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/node.ts#L14)

___

### PingPeerPayload

• `Const` **PingPeerPayload**: `ZodObject`\<[`PingPeerPayloadType`](modules.md#pingpeerpayloadtype)\>

Ping peer

#### Defined in

[src/types/peers.ts:25](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/peers.ts#L25)

___

### PingPeerResponse

• `Const` **PingPeerResponse**: `ZodObject`\<[`PingPeerResponseType`](modules.md#pingpeerresponsetype)\>

#### Defined in

[src/types/peers.ts:31](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/peers.ts#L31)

___

### PopAllMessagesPayload

• `Const` **PopAllMessagesPayload**: `ZodObject`\<[`PopAllMessagesPayloadType`](modules.md#popallmessagespayloadtype)\>

Pop all messages

#### Defined in

[src/types/messages.ts:66](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L66)

___

### PopAllMessagesResponse

• `Const` **PopAllMessagesResponse**: `ZodObject`\<[`PopAllMessagesResponseType`](modules.md#popallmessagesresponsetype)\>

#### Defined in

[src/types/messages.ts:72](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L72)

___

### PopMessagePayload

• `Const` **PopMessagePayload**: `ZodObject`\<[`PopMessagePayloadType`](modules.md#popmessagepayloadtype)\>

Pop message

#### Defined in

[src/types/messages.ts:54](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L54)

___

### PopMessageResponse

• `Const` **PopMessageResponse**: `ZodObject`\<[`PopMessageResponseType`](modules.md#popmessageresponsetype)\> = `ReceivedMessage`

#### Defined in

[src/types/messages.ts:60](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L60)

___

### ReceivedMessage

• `Const` **ReceivedMessage**: `ZodObject`\<\{ `body`: `ZodString` ; `receivedAt`: `ZodNumber` ; `tag`: `ZodNumber`  }, ``"strip"``, `ZodTypeAny`, \{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }, \{ `body`: `string` ; `receivedAt`: `number` ; `tag`: `number`  }\>

General

#### Defined in

[src/types/messages.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L8)

___

### RedeemChannelTicketsPayload

• `Const` **RedeemChannelTicketsPayload**: `ZodObject`\<[`AggregateChannelTicketsPayloadType`](modules.md#aggregatechannelticketspayloadtype)\>

Redeem channel tickets

#### Defined in

[src/types/channels.ts:32](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L32)

___

### SendMessagePayload

• `Const` **SendMessagePayload**: `ZodObject`\<[`SendMessagePayloadType`](modules.md#sendmessagepayloadtype)\>

Send Message

#### Defined in

[src/types/messages.ts:18](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/messages.ts#L18)

___

### SetAliasPayload

• `Const` **SetAliasPayload**: `ZodObject`\<[`SetAliasPayloadType`](modules.md#setaliaspayloadtype)\>

setAlias

#### Defined in

[src/types/aliases.ts:26](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/aliases.ts#L26)

___

### Ticket

• `Const` **Ticket**: `ZodObject`\<\{ `amount`: `ZodString` ; `channelEpoch`: `ZodNumber` ; `channelId`: `ZodString` ; `index`: `ZodNumber` ; `indexOffset`: `ZodNumber` ; `signature`: `ZodString` ; `winProb`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, \{ `amount`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `index`: `number` ; `indexOffset`: `number` ; `signature`: `string` ; `winProb`: `string`  }, \{ `amount`: `string` ; `channelEpoch`: `number` ; `channelId`: `string` ; `index`: `number` ; `indexOffset`: `number` ; `signature`: `string` ; `winProb`: `string`  }\>

#### Defined in

[src/types/channels.ts:112](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/channels.ts#L112)

___

### TokenCapability

• `Const` **TokenCapability**: `ZodObject`\<\{ `endpoint`: `ZodEnum`\<[``"accountWithdraw"``, ``"accountGetBalances"``, ``"accountGetAddresses"``, ``"aliasesGetAliases"``, ``"aliasesSetAlias"``, ``"aliasesGetAlias"``, ``"aliasesRemoveAlias"``, ``"channelsFundChannels"``, ``"channelsOpenChannel"``, ``"channelsGetChannels"``]\> ; `limits`: `ZodArray`\<`ZodObject`\<\{ `conditions`: `ZodOptional`\<`ZodObject`\<\{ `max`: `ZodOptional`\<`ZodNumber`\>  }, ``"strip"``, `ZodTypeAny`, \{ `max?`: `number`  }, \{ `max?`: `number`  }\>\> ; `type`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }, \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }\>, ``"many"``\>  }, ``"strip"``, `ZodTypeAny`, \{ `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }[]  }, \{ `endpoint`: ``"accountWithdraw"`` \| ``"accountGetBalances"`` \| ``"accountGetAddresses"`` \| ``"aliasesGetAliases"`` \| ``"aliasesSetAlias"`` \| ``"aliasesGetAlias"`` \| ``"aliasesRemoveAlias"`` \| ``"channelsFundChannels"`` \| ``"channelsOpenChannel"`` \| ``"channelsGetChannels"`` \| ``"channelsRedeemTickets"`` \| ``"channelsGetTickets"`` \| ``"channelsGetChannel"`` \| ``"channelsCloseChannel"`` \| ``"messagesWebsocket"`` \| ``"messagesSign"`` \| ``"messagesSendMessage"`` \| ``"nodeGetVersion"`` \| ``"nodeStreamWebsocket"`` \| ``"nodePing"`` \| ``"nodeGetPeers"`` \| ``"nodeGetMetrics"`` \| ``"nodeGetInfo"`` \| ``"nodeGetEntryNodes"`` \| ``"peerInfoGetPeerInfo"`` \| ``"settingsGetSettings"`` \| ``"settingsSetSetting"`` \| ``"ticketsGetStatistics"`` \| ``"ticketsRedeemTickets"`` \| ``"ticketsGetTickets"`` \| ``"tokensCreate"`` \| ``"tokensGetToken"`` \| ``"tokensDelete"`` ; `limits`: \{ `conditions?`: \{ `max?`: `number`  } ; `type`: `string`  }[]  }\>

#### Defined in

[src/types/tokens.ts:55](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/tokens.ts#L55)

___

### WithdrawPayload

• `Const` **WithdrawPayload**: `ZodObject`\<[`WithdrawPayloadType`](modules.md#withdrawpayloadtype)\>

withdraw

#### Defined in

[src/types/account.ts:33](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/account.ts#L33)

___

### WithdrawResponse

• `Const` **WithdrawResponse**: `ZodObject`\<\{ `receipt`: `ZodString`  }, ``"strip"``, `ZodTypeAny`, \{ `receipt`: `string`  }, \{ `receipt`: `string`  }\>

#### Defined in

[src/types/account.ts:41](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/account.ts#L41)

___

### createWsUrlPayload

• `Const` **createWsUrlPayload**: `ZodObject`\<[`createWsUrlType`](modules.md#createwsurltype)\>

createWsUrl

#### Defined in

[src/types/websocket.ts:7](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/types/websocket.ts#L7)
