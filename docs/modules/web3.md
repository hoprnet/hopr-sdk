# Namespace: web3

## Table of contents

### Variables

- [DUFOUR](web3.md#dufour)
- [HOPR\_CHANNELS\_SMART\_CONTRACT\_ADDRESS](web3.md#hopr_channels_smart_contract_address)
- [erc721ABI](web3.md#erc721abi)
- [hoprBoostNFTABI](web3.md#hoprboostnftabi)
- [hoprChannelsABI](web3.md#hoprchannelsabi)
- [hoprMultiSendABI](web3.md#hoprmultisendabi)
- [hoprNetworkRegistryABI](web3.md#hoprnetworkregistryabi)
- [hoprNodeManagementModuleABI](web3.md#hoprnodemanagementmoduleabi)
- [hoprNodeSafeRegistryABI](web3.md#hoprnodesaferegistryabi)
- [hoprNodeStakeFactoryABI](web3.md#hoprnodestakefactoryabi)
- [hoprSafeABI](web3.md#hoprsafeabi)
- [hoprWrapperABI](web3.md#hoprwrapperabi)
- [mHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS](web3.md#mhopr_token_smart_contract_address)
- [wrapperABI](web3.md#wrapperabi)
- [wxHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS](web3.md#wxhopr_token_smart_contract_address)
- [wxHOPR\_WRAPPER\_SMART\_CONTRACT\_ADDRESS](web3.md#wxhopr_wrapper_smart_contract_address)
- [xHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS](web3.md#xhopr_token_smart_contract_address)

## Variables

### DUFOUR

• `Const` **DUFOUR**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addresses` | \{ `announcements`: `string` = '0x619eabE23FD0E2291B50a507719aa633fE6069b8'; `channels`: `string` = '0x693Bac5ce61c720dDC68533991Ceb41199D8F8ae'; `module_implementation`: `string` = '0xB7397C218766eBe6A1A634df523A1a7e412e67eA'; `network_registry`: `string` = '0x582b4b586168621dAf83bEb2AeADb5fb20F8d50d'; `network_registry_proxy`: `string` = '0x2bc6b78B0aA892e97714F0e3b1c74487f92C5884'; `node_safe_registry`: `string` = '0xe15C24a0910311c83aC78B5930d771089E93077b'; `node_stake_v2_factory`: `string` = '0x098B275485c406573D042848D66eb9d63fca311C'; `ticket_price_oracle`: `string` = '0xcA5656Fe6F2d847ACA32cf5f38E51D2054cA1273'; `token`: `string` = '0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1' } |
| `addresses.announcements` | `string` |
| `addresses.channels` | `string` |
| `addresses.module_implementation` | `string` |
| `addresses.network_registry` | `string` |
| `addresses.network_registry_proxy` | `string` |
| `addresses.node_safe_registry` | `string` |
| `addresses.node_stake_v2_factory` | `string` |
| `addresses.ticket_price_oracle` | `string` |
| `addresses.token` | `string` |
| `environment_type` | `string` |
| `indexer_start_block_number` | `number` |

#### Defined in

[src/ethereum/smartContractAddresses.ts:12](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/smartContractAddresses.ts#L12)

___

### HOPR\_CHANNELS\_SMART\_CONTRACT\_ADDRESS

• `Const` **HOPR\_CHANNELS\_SMART\_CONTRACT\_ADDRESS**: ``"0xfabee463f31e39ec8952bbfb4490c41103bf573e"``

#### Defined in

[src/ethereum/smartContractAddresses.ts:2](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/smartContractAddresses.ts#L2)

___

### erc721ABI

• `Const` **erc721ABI**: (\{ `anonymous`: `boolean` = false; `inputs`: \{ `indexed`: `boolean` = true; `internalType`: `string` = 'address'; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'Approval'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'balanceOf'; `outputs`: \{ `internalType`: `string` = 'uint256'; `name`: `string` = 'balance'; `type`: `string` = 'uint256' }[] ; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/erc721ABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/erc721ABI.ts#L1)

___

### hoprBoostNFTABI

• `Const` **hoprBoostNFTABI**: (\{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = 'newAdmin'; `type`: `string` = 'address' }[] ; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'constructor' } \| \{ `anonymous`: `boolean` = false; `inputs`: \{ `indexed`: `boolean` = true; `internalType`: `string` = 'address'; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'Approval'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'balanceOf'; `outputs`: \{ `internalType`: `string` = 'uint256'; `name`: `string` = ''; `type`: `string` = 'uint256' }[] ; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/stakingV2/hoprBoostNFTABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprBoostNFTABI.ts#L1)

___

### hoprChannelsABI

• `Const` **hoprChannelsABI**: (\{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = '\_token'; `type`: `string` = 'address' }[] ; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'constructor' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'string'; `name`: `string` = 'reason'; `type`: `string` = 'string' }[] ; `name`: `string` = 'WrongChannelState'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'error' } \| \{ `anonymous`: `boolean` = false; `inputs`: \{ `indexed`: `boolean` = true; `internalType`: `string` = 'bytes32'; `name`: `string` = 'channelId'; `type`: `string` = 'bytes32' }[] ; `name`: `string` = 'ChannelBalanceDecreased'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `inputs`: (\{ `components?`: `undefined` ; `internalType`: `string` = 'bytes32'; `name`: `string` = 'ticketHash'; `type`: `string` = 'bytes32' } \| \{ `components`: (\{ `components`: \{ `internalType`: ... = 'bytes32'; `name`: ... = 'channelId'; `type`: ... = 'bytes32' }[] ; `internalType`: `string` = 'struct HoprChannels.TicketData'; `name`: `string` = 'data'; `type`: `string` = 'tuple' } \| \{ `components?`: `undefined` ; `internalType`: `string` = 'uint256'; `name`: `string` = 'porSecret'; `type`: `string` = 'uint256' })[] ; `internalType`: `string` = 'struct HoprChannels.RedeemableTicket'; `name`: `string` = 'redeemable'; `type`: `string` = 'tuple' })[] ; `name`: `string` = '\_isWinningTicket'; `outputs`: \{ `internalType`: `string` = 'bool'; `name`: `string` = ''; `type`: `string` = 'bool' }[] ; `stateMutability`: `string` = 'pure'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/stakingV2/hoprChannelsABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprChannelsABI.ts#L1)

___

### hoprMultiSendABI

• `Const` **hoprMultiSendABI**: (\{ `anonymous`: `boolean` = false; `inputs`: \{ `indexed`: `boolean` = true; `internalType`: `string` = 'address'; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'Approval'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'balanceOf'; `outputs`: \{ `internalType`: `string` = 'uint256'; `name`: `string` = 'balance'; `type`: `string` = 'uint256' }[] ; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/stakingV2/hoprMultiSendABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprMultiSendABI.ts#L1)

___

### hoprNetworkRegistryABI

• `Const` **hoprNetworkRegistryABI**: (\{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = '\_requirementImplementation'; `type`: `string` = 'address' }[] ; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'constructor' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = 'nodeAddress'; `type`: `string` = 'address' }[] ; `name`: `string` = 'CannotOperateForNode'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'error' } \| \{ `anonymous`: `boolean` = false; `inputs`: \{ `indexed`: `boolean` = true; `internalType`: `string` = 'address'; `name`: `string` = 'stakingAccount'; `type`: `string` = 'address' }[] ; `name`: `string` = 'Deregistered'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = ''; `type`: `string` = 'address' }[] ; `name`: `string` = 'countRegisterdNodesPerAccount'; `outputs`: \{ `internalType`: `string` = 'uint256'; `name`: `string` = ''; `type`: `string` = 'uint256' }[] ; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/stakingV2/hoprNetworkRegistryABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprNetworkRegistryABI.ts#L1)

___

### hoprNodeManagementModuleABI

• `Const` **hoprNodeManagementModuleABI**: (\{ `anonymous?`: `undefined` = false; `inputs`: `never`[] = []; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'constructor' } \| \{ `anonymous?`: `undefined` = false; `inputs`: `never`[] = []; `name`: `string` = 'AddressIsZero'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'error' } \| \{ `anonymous`: `boolean` = false; `inputs`: \{ `indexed`: `boolean` = false; `internalType`: `string` = 'address'; `name`: `string` = 'previousAdmin'; `type`: `string` = 'address' }[] ; `name`: `string` = 'AdminChanged'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'bytes32'; `name`: `string` = 'encoded'; `type`: `string` = 'bytes32' }[] ; `name`: `string` = 'decodeFunctionSigsAndPermissions'; `outputs`: \{ `internalType`: `string` = 'bytes4[]'; `name`: `string` = 'functionSigs'; `type`: `string` = 'bytes4[]' }[] ; `stateMutability`: `string` = 'pure'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/stakingV2/hoprNodeModuleABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprNodeModuleABI.ts#L1)

___

### hoprNodeSafeRegistryABI

• `Const` **hoprNodeSafeRegistryABI**: (\{ `anonymous?`: `undefined` = false; `inputs`: `never`[] = []; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'constructor' } \| \{ `anonymous?`: `undefined` = false; `inputs`: `never`[] = []; `name`: `string` = 'NodeAddressZero'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'error' } \| \{ `anonymous`: `boolean` = false; `inputs`: \{ `indexed`: `boolean` = true; `internalType`: `string` = 'address'; `name`: `string` = 'safeAddress'; `type`: `string` = 'address' }[] ; `name`: `string` = 'DergisteredNodeSafe'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `components`: \{ `internalType`: `string` = 'address'; `name`: `string` = 'safeAddress'; `type`: `string` = 'address' }[] ; `internalType`: `string` = 'struct HoprNodeSafeRegistry.NodeSafe'; `name`: `string` = 'nodeSafe'; `type`: `string` = 'tuple' }[] ; `name`: `string` = 'isNodeSafeRegistered'; `outputs`: \{ `internalType`: `string` = 'bool'; `name`: `string` = ''; `type`: `string` = 'bool' }[] ; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = ''; `type`: `string` = 'address' }[] ; `name`: `string` = 'nodeToSafe'; `outputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = ''; `type`: `string` = 'address' }[] ; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' } \| \{ `anonymous?`: `undefined` = false; `inputs`: (\{ `components`: \{ `internalType`: `string` = 'address'; `name`: `string` = 'safeAddress'; `type`: `string` = 'address' }[] ; `internalType`: `string` = 'struct HoprNodeSafeRegistry.NodeSafe'; `name`: `string` = 'nodeSafe'; `type`: `string` = 'tuple' } \| \{ `components?`: `undefined` ; `internalType`: `string` = 'bytes'; `name`: `string` = 'sig'; `type`: `string` = 'bytes' })[] ; `name`: `string` = 'registerSafeWithNodeSig'; `outputs`: `never`[] = []; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/stakingV2/hoprNodeSafeRegistryABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprNodeSafeRegistryABI.ts#L1)

___

### hoprNodeStakeFactoryABI

• `Const` **hoprNodeStakeFactoryABI**: (\{ `anonymous?`: `undefined` = false; `inputs`: `never`[] = []; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'constructor' } \| \{ `anonymous?`: `undefined` = false; `inputs`: `never`[] = []; `name`: `string` = 'TooFewOwners'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'error' } \| \{ `anonymous`: `boolean` = false; `inputs`: \{ `indexed`: `boolean` = false; `internalType`: `string` = 'address'; `name`: `string` = 'instance'; `type`: `string` = 'address' }[] ; `name`: `string` = 'NewHoprNodeStakeModule'; `outputs?`: `undefined` ; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = 'moduleSingletonAddress'; `type`: `string` = 'address' }[] ; `name`: `string` = 'clone'; `outputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = ''; `type`: `string` = 'address' }[] ; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/stakingV2/hoprNodeStakeFactoryABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprNodeStakeFactoryABI.ts#L1)

___

### hoprSafeABI

• `Const` **hoprSafeABI**: (\{ `anonymous?`: `undefined` = false; `constant?`: `undefined` = true; `inputs`: `never`[] = []; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `payable`: `boolean` = false; `stateMutability`: `string` = 'nonpayable'; `type`: `string` = 'constructor' } \| \{ `anonymous`: `boolean` = false; `constant?`: `undefined` = true; `inputs`: \{ `indexed`: `boolean` = false; `internalType`: `string` = 'address'; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'AddedOwner'; `outputs?`: `undefined` ; `payable?`: `undefined` = true; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' } \| \{ `anonymous?`: `undefined` = false; `constant?`: `undefined` = true; `inputs?`: `undefined` ; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `payable`: `boolean` = true; `stateMutability`: `string` = 'payable'; `type`: `string` = 'fallback' } \| \{ `anonymous?`: `undefined` = false; `constant`: `boolean` = true; `inputs`: \{ `internalType`: `string` = 'address'; `name`: `string` = ''; `type`: `string` = 'address' }[] ; `name`: `string` = 'approvedHashes'; `outputs`: \{ `internalType`: `string` = 'uint256'; `name`: `string` = ''; `type`: `string` = 'uint256' }[] ; `payable`: `boolean` = false; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' })[]

#### Defined in

[src/ethereum/stakingV2/hoprSafeABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprSafeABI.ts#L1)

___

### hoprWrapperABI

• `Const` **hoprWrapperABI**: (\{ `anonymous?`: `undefined` = false; `constant`: `boolean` = true; `inputs`: \{ `name`: `string` = '\_owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'balanceOf'; `outputs`: \{ `name`: `string` = 'balance'; `type`: `string` = 'uint256' }[] ; `payable`: `boolean` = false; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' } \| \{ `anonymous?`: `undefined` = false; `constant?`: `undefined` = true; `inputs?`: `undefined` ; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `payable`: `boolean` = true; `stateMutability`: `string` = 'payable'; `type`: `string` = 'fallback' } \| \{ `anonymous`: `boolean` = false; `constant?`: `undefined` = true; `inputs`: \{ `indexed`: `boolean` = true; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'Approval'; `outputs?`: `undefined` ; `payable?`: `undefined` = true; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' })[]

#### Defined in

[src/ethereum/stakingV2/hoprWrapperABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/stakingV2/hoprWrapperABI.ts#L1)

___

### mHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS

• `Const` **mHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS**: ``"0x66225dE86Cac02b32f34992eb3410F59DE416698"``

#### Defined in

[src/ethereum/smartContractAddresses.ts:4](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/smartContractAddresses.ts#L4)

___

### wrapperABI

• `Const` **wrapperABI**: (\{ `anonymous?`: `undefined` = false; `constant`: `boolean` = true; `inputs`: \{ `name`: `string` = '\_owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'balanceOf'; `outputs`: \{ `name`: `string` = 'balance'; `type`: `string` = 'uint256' }[] ; `payable`: `boolean` = false; `stateMutability`: `string` = 'view'; `type`: `string` = 'function' } \| \{ `anonymous?`: `undefined` = false; `constant?`: `undefined` = true; `inputs?`: `undefined` ; `name?`: `undefined` = 'Approval'; `outputs?`: `undefined` ; `payable`: `boolean` = true; `stateMutability`: `string` = 'payable'; `type`: `string` = 'fallback' } \| \{ `anonymous`: `boolean` = false; `constant?`: `undefined` = true; `inputs`: \{ `indexed`: `boolean` = true; `name`: `string` = 'owner'; `type`: `string` = 'address' }[] ; `name`: `string` = 'Approval'; `outputs?`: `undefined` ; `payable?`: `undefined` = true; `stateMutability?`: `undefined` = 'payable'; `type`: `string` = 'event' })[]

#### Defined in

[src/ethereum/wrapperABI.ts:1](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/wrapperABI.ts#L1)

___

### wxHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS

• `Const` **wxHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS**: ``"0xD4fdec44DB9D44B8f2b6d529620f9C0C7066A2c1"``

#### Defined in

[src/ethereum/smartContractAddresses.ts:8](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/smartContractAddresses.ts#L8)

___

### wxHOPR\_WRAPPER\_SMART\_CONTRACT\_ADDRESS

• `Const` **wxHOPR\_WRAPPER\_SMART\_CONTRACT\_ADDRESS**: ``"0x097707143e01318734535676cfe2e5cF8b656ae8"``

#### Defined in

[src/ethereum/smartContractAddresses.ts:10](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/smartContractAddresses.ts#L10)

___

### xHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS

• `Const` **xHOPR\_TOKEN\_SMART\_CONTRACT\_ADDRESS**: ``"0xD057604A14982FE8D88c5fC25Aac3267eA142a08"``

#### Defined in

[src/ethereum/smartContractAddresses.ts:6](https://github.com/hoprnet/hopr-sdk/blob/7b4777d5661880e8518778cfcfa0ac332679e349/src/ethereum/smartContractAddresses.ts#L6)
