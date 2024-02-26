# Namespace: flows

## Table of contents

### Functions

- [cashOut](flows.md#cashout)
- [closeEverything](flows.md#closeeverything)
- [getOutgoingChannels](flows.md#getoutgoingchannels)
- [openMultipleChannels](flows.md#openmultiplechannels)
- [safeSendMessage](flows.md#safesendmessage)

## Functions

### cashOut

▸ **cashOut**(`payload`): `Promise`<{ `hopr?`: `string` ; `native?`: `string`  }\>

Withdraw all funds from the node.
Does not include funds locked in open channels and pending tickets.
This is a long running function and may take a more than 5 minutes to run

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.ethereumAddress` | `string` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `hopr?`: `string` ; `native?`: `string`  }\>

The transaction receipts for the cash out transactions.

#### Defined in

[src/flows/cashOut.ts:11](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/flows/cashOut.ts#L11)

___

### closeEverything

▸ **closeEverything**(`payload`): `Promise`<{ `closedChannels`: { `channelStatus`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `receipt`: `string`  }[] ; `redeemedTickets`: `boolean` = ticketsHaveBeenRedeemed }\>

Closes all open outgoing channels and redeems any pending tickets.
This is a long running function and may take a more than 5 minutes to run

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `closedChannels`: { `channelStatus`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `receipt`: `string`  }[] ; `redeemedTickets`: `boolean` = ticketsHaveBeenRedeemed }\>

#### Defined in

[src/flows/closeEverything.ts:10](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/flows/closeEverything.ts#L10)

___

### getOutgoingChannels

▸ **getOutgoingChannels**(`payload`): `Promise`<{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `type`: ``"incoming"`` \| ``"outgoing"``  }[]\>

Gets the outgoing channels with optional status filter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.status?` | ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` \| ``"WaitingForCommitment"`` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<{ `balance`: `string` ; `id`: `string` ; `peerAddress`: `string` ; `status`: ``"Open"`` \| ``"PendingToClose"`` \| ``"Closed"`` = ChannelStatus; `type`: ``"incoming"`` \| ``"outgoing"``  }[]\>

An array of outgoing channels matching the status filter.

#### Defined in

[src/flows/getOutgoingChannels.ts:10](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/flows/getOutgoingChannels.ts#L10)

___

### openMultipleChannels

▸ **openMultipleChannels**(`payload`): `Promise`<`undefined` \| { `[peerId: string]`: { `channelId`: `string` ; `transactionReceipt`: `string`  };  }\>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | - |
| `payload.amount` | `string` | - |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.peerAddresses` | `string`[] | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`undefined` \| { `[peerId: string]`: { `channelId`: `string` ; `transactionReceipt`: `string`  };  }\>

#### Defined in

[src/flows/openMultipleChannels.ts:13](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/flows/openMultipleChannels.ts#L13)

___

### safeSendMessage

▸ **safeSendMessage**(`payload`): `Promise`<`undefined` \| `string`\>

Safely send a message through the network. Checks if node has at least
one open outgoing channel

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `payload` | `Object` | The payload of the message. |
| `payload.apiEndpoint` | `string` | The API endpoint for authentication. |
| `payload.apiToken` | `string` | The API token for authentication. |
| `payload.body` | `string` | - |
| `payload.hops?` | `number` | - |
| `payload.path?` | `string`[] | - |
| `payload.peerId` | `string` | - |
| `payload.tag` | `number` | - |
| `payload.timeout?` | `number` | optional timeout for the requests |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[src/flows/safeSendMessage.ts:13](https://github.com/hoprnet/hopr-sdk/blob/46802f9/src/flows/safeSendMessage.ts#L13)
