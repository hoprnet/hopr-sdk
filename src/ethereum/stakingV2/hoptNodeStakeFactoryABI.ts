export const hoprNodeStakeFactoryABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'TooFewOwners',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'instance',
        type: 'address'
      }
    ],
    name: 'NewHoprNodeStakeModule',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'instance',
        type: 'address'
      }
    ],
    name: 'NewHoprNodeStakeSafe',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'moduleSingletonAddress',
        type: 'address'
      },
      {
        internalType: 'address[]',
        name: 'admins',
        type: 'address[]'
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256'
      },
      {
        internalType: 'bytes32',
        name: 'defaultTarget',
        type: 'bytes32'
      }
    ],
    name: 'clone',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address payable',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'implementation',
        type: 'address'
      },
      {
        internalType: 'bytes32',
        name: 'salt',
        type: 'bytes32'
      }
    ],
    name: 'predictDeterministicAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'predicted',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'safeVersion',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  }
];
