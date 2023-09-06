export const hoprChannelsABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        internalType: 'HoprChannels.Timestamp',
        name: '_noticePeriodChannelClosure',
        type: 'uint32'
      },
      {
        internalType: 'contract HoprNodeSafeRegistry',
        name: '_safeRegistry',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AlreadyInitialized',
    type: 'error'
  },
  {
    inputs: [],
    name: 'BalanceExceedsGlobalPerChannelAllowance',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ContractNotResponsible',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InsufficientChannelBalance',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidAggregatedTicketInterval',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidBalance',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidCurvePoint',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidFieldElement',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidNoticePeriod',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidPointWitness',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidSafeAddress',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidTicketSignature',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidTokenRecipient',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidTokensReceivedUsage',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidVRFProof',
    type: 'error'
  },
  {
    inputs: [],
    name: 'MultiSigUninitialized',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NoticePeriodNotDue',
    type: 'error'
  },
  {
    inputs: [],
    name: 'SourceEqualsDestination',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TicketIsNotAWin',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TokenTransferFailed',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'reason',
        type: 'string'
      }
    ],
    name: 'WrongChannelState',
    type: 'error'
  },
  {
    inputs: [],
    name: 'WrongToken',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'reason',
        type: 'string'
      }
    ],
    name: 'ZeroAddress',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'channelId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'HoprChannels.Balance',
        name: 'newBalance',
        type: 'uint96'
      }
    ],
    name: 'ChannelBalanceDecreased',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'channelId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'HoprChannels.Balance',
        name: 'newBalance',
        type: 'uint96'
      }
    ],
    name: 'ChannelBalanceIncreased',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'channelId',
        type: 'bytes32'
      }
    ],
    name: 'ChannelClosed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: 'ChannelOpened',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'channelId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'HoprChannels.Timestamp',
        name: 'closureTime',
        type: 'uint32'
      }
    ],
    name: 'OutgoingChannelClosureInitiated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'channelId',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'HoprChannels.TicketIndex',
        name: 'newTicketIndex',
        type: 'uint48'
      }
    ],
    name: 'TicketRedeemed',
    type: 'event'
  },
  {
    inputs: [],
    name: 'ERC777_HOOK_FUND_CHANNEL_MULTI_SIZE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ERC777_HOOK_FUND_CHANNEL_SIZE',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'LEDGER_VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'MAX_USED_BALANCE',
    outputs: [
      {
        internalType: 'HoprChannels.Balance',
        name: '',
        type: 'uint96'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'MIN_USED_BALANCE',
    outputs: [
      {
        internalType: 'HoprChannels.Balance',
        name: '',
        type: 'uint96'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'TOKENS_RECIPIENT_INTERFACE_HASH',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: '_currentBlockTimestamp',
    outputs: [
      {
        internalType: 'HoprChannels.Timestamp',
        name: '',
        type: 'uint32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'source',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: '_getChannelId',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'channelId',
                type: 'bytes32'
              },
              {
                internalType: 'HoprChannels.Balance',
                name: 'amount',
                type: 'uint96'
              },
              {
                internalType: 'HoprChannels.TicketIndex',
                name: 'ticketIndex',
                type: 'uint48'
              },
              {
                internalType: 'HoprChannels.TicketIndexOffset',
                name: 'indexOffset',
                type: 'uint32'
              },
              {
                internalType: 'HoprChannels.ChannelEpoch',
                name: 'epoch',
                type: 'uint24'
              },
              {
                internalType: 'HoprChannels.WinProb',
                name: 'winProb',
                type: 'uint56'
              }
            ],
            internalType: 'struct HoprChannels.TicketData',
            name: 'data',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 'vs',
                type: 'bytes32'
              }
            ],
            internalType: 'struct HoprCrypto.CompactSignature',
            name: 'signature',
            type: 'tuple'
          },
          {
            internalType: 'uint256',
            name: 'porSecret',
            type: 'uint256'
          }
        ],
        internalType: 'struct HoprChannels.RedeemableTicket',
        name: 'redeemable',
        type: 'tuple'
      }
    ],
    name: '_getTicketHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'ticketHash',
        type: 'bytes32'
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'channelId',
                type: 'bytes32'
              },
              {
                internalType: 'HoprChannels.Balance',
                name: 'amount',
                type: 'uint96'
              },
              {
                internalType: 'HoprChannels.TicketIndex',
                name: 'ticketIndex',
                type: 'uint48'
              },
              {
                internalType: 'HoprChannels.TicketIndexOffset',
                name: 'indexOffset',
                type: 'uint32'
              },
              {
                internalType: 'HoprChannels.ChannelEpoch',
                name: 'epoch',
                type: 'uint24'
              },
              {
                internalType: 'HoprChannels.WinProb',
                name: 'winProb',
                type: 'uint56'
              }
            ],
            internalType: 'struct HoprChannels.TicketData',
            name: 'data',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 'vs',
                type: 'bytes32'
              }
            ],
            internalType: 'struct HoprCrypto.CompactSignature',
            name: 'signature',
            type: 'tuple'
          },
          {
            internalType: 'uint256',
            name: 'porSecret',
            type: 'uint256'
          }
        ],
        internalType: 'struct HoprChannels.RedeemableTicket',
        name: 'redeemable',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'vx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'vy',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 's',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'h',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sBx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sBy',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hVx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hVy',
            type: 'uint256'
          }
        ],
        internalType: 'struct HoprCrypto.VRFParameters',
        name: 'params',
        type: 'tuple'
      }
    ],
    name: '_isWinningTicket',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'interfaceHash',
        type: 'bytes32'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'canImplementInterfaceForAddress',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'channels',
    outputs: [
      {
        internalType: 'HoprChannels.Balance',
        name: 'balance',
        type: 'uint96'
      },
      {
        internalType: 'HoprChannels.TicketIndex',
        name: 'ticketIndex',
        type: 'uint48'
      },
      {
        internalType: 'HoprChannels.Timestamp',
        name: 'closureTime',
        type: 'uint32'
      },
      {
        internalType: 'HoprChannels.ChannelEpoch',
        name: 'epoch',
        type: 'uint24'
      },
      {
        internalType: 'enum HoprChannels.ChannelStatus',
        name: 'status',
        type: 'uint8'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'source',
        type: 'address'
      }
    ],
    name: 'closeIncomingChannel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'self',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'source',
        type: 'address'
      }
    ],
    name: 'closeIncomingChannelSafe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'domainSeparator',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: 'finalizeOutgoingChannelClosure',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'self',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: 'finalizeOutgoingChannelClosureSafe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'HoprChannels.Balance',
        name: 'amount',
        type: 'uint96'
      }
    ],
    name: 'fundChannel',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'self',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        internalType: 'HoprChannels.Balance',
        name: 'amount',
        type: 'uint96'
      }
    ],
    name: 'fundChannelSafe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: 'initiateOutgoingChannelClosure',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'self',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'destination',
        type: 'address'
      }
    ],
    name: 'initiateOutgoingChannelClosureSafe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'ledgerDomainSeparator',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]'
      }
    ],
    name: 'multicall',
    outputs: [
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'noticePeriodChannelClosure',
    outputs: [
      {
        internalType: 'HoprChannels.Timestamp',
        name: '',
        type: 'uint32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'channelId',
                type: 'bytes32'
              },
              {
                internalType: 'HoprChannels.Balance',
                name: 'amount',
                type: 'uint96'
              },
              {
                internalType: 'HoprChannels.TicketIndex',
                name: 'ticketIndex',
                type: 'uint48'
              },
              {
                internalType: 'HoprChannels.TicketIndexOffset',
                name: 'indexOffset',
                type: 'uint32'
              },
              {
                internalType: 'HoprChannels.ChannelEpoch',
                name: 'epoch',
                type: 'uint24'
              },
              {
                internalType: 'HoprChannels.WinProb',
                name: 'winProb',
                type: 'uint56'
              }
            ],
            internalType: 'struct HoprChannels.TicketData',
            name: 'data',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 'vs',
                type: 'bytes32'
              }
            ],
            internalType: 'struct HoprCrypto.CompactSignature',
            name: 'signature',
            type: 'tuple'
          },
          {
            internalType: 'uint256',
            name: 'porSecret',
            type: 'uint256'
          }
        ],
        internalType: 'struct HoprChannels.RedeemableTicket',
        name: 'redeemable',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'vx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'vy',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 's',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'h',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sBx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sBy',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hVx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hVy',
            type: 'uint256'
          }
        ],
        internalType: 'struct HoprCrypto.VRFParameters',
        name: 'params',
        type: 'tuple'
      }
    ],
    name: 'redeemTicket',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'self',
        type: 'address'
      },
      {
        components: [
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'channelId',
                type: 'bytes32'
              },
              {
                internalType: 'HoprChannels.Balance',
                name: 'amount',
                type: 'uint96'
              },
              {
                internalType: 'HoprChannels.TicketIndex',
                name: 'ticketIndex',
                type: 'uint48'
              },
              {
                internalType: 'HoprChannels.TicketIndexOffset',
                name: 'indexOffset',
                type: 'uint32'
              },
              {
                internalType: 'HoprChannels.ChannelEpoch',
                name: 'epoch',
                type: 'uint24'
              },
              {
                internalType: 'HoprChannels.WinProb',
                name: 'winProb',
                type: 'uint56'
              }
            ],
            internalType: 'struct HoprChannels.TicketData',
            name: 'data',
            type: 'tuple'
          },
          {
            components: [
              {
                internalType: 'bytes32',
                name: 'r',
                type: 'bytes32'
              },
              {
                internalType: 'bytes32',
                name: 'vs',
                type: 'bytes32'
              }
            ],
            internalType: 'struct HoprCrypto.CompactSignature',
            name: 'signature',
            type: 'tuple'
          },
          {
            internalType: 'uint256',
            name: 'porSecret',
            type: 'uint256'
          }
        ],
        internalType: 'struct HoprChannels.RedeemableTicket',
        name: 'redeemable',
        type: 'tuple'
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'vx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'vy',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 's',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'h',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sBx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'sBy',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hVx',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'hVy',
            type: 'uint256'
          }
        ],
        internalType: 'struct HoprCrypto.VRFParameters',
        name: 'params',
        type: 'tuple'
      }
    ],
    name: 'redeemTicketSafe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'from',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'userData',
        type: 'bytes'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'tokensReceived',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
