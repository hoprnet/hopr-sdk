import nock from 'nock';
import { sdkApiError } from '../../utils';
import { getConfiguration } from './getConfiguration';
import { GetConfigurationResponseType } from '../../types';

const API_ENDPOINT = 'http://localhost:3001';
const API_TOKEN = 'S3CR3T-T0K3N';

describe('getConfiguration', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should return a configuration if 200', async function () {
    const response: string =
      '{"hopr":{"host":{"address":{"IPv4":"65.109.137.126"},"port":9091},"db":{"data":"/app/hoprd-db/db","initialize":true,"force_initialize":false},"strategy":{"on_fail_continue":true,"allow_recursive":true,"strategies":[{"Aggregating":{"aggregation_threshold":3,"unrealized_balance_ratio":0.95,"aggregate_on_channel_close":true}},{"AutoRedeeming":{"redeem_only_aggregated":true,"on_close_redeem_single_tickets_value_min":"2000000000000000000 HOPR"}},{"ClosureFinalizer":{"max_closure_overdue":3600}}]},"heartbeat":{"variance":2,"interval":60,"threshold":60},"network_options":{"min_delay":1,"max_delay":300,"quality_bad_threshold":0.2,"quality_offline_threshold":0.5,"quality_step":0.1,"quality_avg_window_size":25,"ignore_timeframe":600,"backoff_exponent":1.5,"backoff_min":2.0,"backoff_max":300.0},"transport":{"announce_local_addresses":false,"prefer_local_addresses":false},"protocol":{"ack":{"timeout":15},"heartbeat":{"timeout":15},"msg":{"timeout":15},"ticket_aggregation":{"timeout":15}},"chain":{"announce":true,"network":"dufour","provider":"https://gnosis-chain.rpc.rank1.co","protocols":{"networks":{"debug-staging":{"chain":"xdai","environment_type":"staging","version_range":"*","indexer_start_block_number":29521261,"tags":["development"],"addresses":{"network_registry":"0xf08e27c3a09627d605bfd164459f7caf18d1d25f","network_registry_proxy":"0x0d1a8f1b13fd1d64696c5e03dd45cd139e40de0c","channels":"0xc060582564b12335cd804339842f5509dbf6f74d","token":"0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1","module_implementation":"0xe8d914ef66b4ff086c6fbcb1e0ea97c0a9d2f3de","node_safe_registry":"0x0bf6bd25ac47fe9d41a99b135cb439b89138f05a","ticket_price_oracle":"0x281a91fea199a3bab5d7d5f05833b257e2fd7741","announcements":"0xd78bca8452b8ea281a659f380e0ef710c64eb85b","node_stake_v2_factory":"0x5f5b459db681996292ad58cc10e88027033149b8"},"confirmations":8,"tx_polling_interval":3000,"max_block_range":1000},"dufour":{"chain":"xdai","environment_type":"production","version_range":"2.*","indexer_start_block_number":29706814,"tags":["etherscan"],"addresses":{"network_registry":"0x582b4b586168621daf83beb2aeadb5fb20f8d50d","network_registry_proxy":"0x2bc6b78b0aa892e97714f0e3b1c74487f92c5884","channels":"0x693bac5ce61c720ddc68533991ceb41199d8f8ae","token":"0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1","module_implementation":"0xb7397c218766ebe6a1a634df523a1a7e412e67ea","node_safe_registry":"0xe15c24a0910311c83ac78b5930d771089e93077b","ticket_price_oracle":"0xca5656fe6f2d847aca32cf5f38e51d2054ca1273","announcements":"0x619eabe23fd0e2291b50a507719aa633fe6069b8","node_stake_v2_factory":"0x098b275485c406573d042848d66eb9d63fca311c"},"confirmations":8,"tx_polling_interval":3000,"max_block_range":1000},"monte_rosa":{"chain":"xdai","environment_type":"production","version_range":"1.89||1.90||1.91||1.92||1.93","indexer_start_block_number":24097267,"tags":["etherscan"],"addresses":{"network_registry":"0x819e6a81e1e3f96cf1ac9200477c2d09c676959d","network_registry_proxy":"0xca9b1bc189f977b2a9217598d0300d956b6a719f","channels":"0xfabee463f31e39ec8952bbfb4490c41103bf573e","token":"0x66225de86cac02b32f34992eb3410f59de416698","module_implementation":"0x0000000000000000000000000000000000000000","node_safe_registry":"0x0000000000000000000000000000000000000000","ticket_price_oracle":"0x0000000000000000000000000000000000000000","announcements":"0x0000000000000000000000000000000000000000","node_stake_v2_factory":"0x0000000000000000000000000000000000000000"},"confirmations":8,"tx_polling_interval":3000,"max_block_range":1000},"rotsee":{"chain":"xdai","environment_type":"staging","version_range":"2.*","indexer_start_block_number":29690361,"tags":["etherscan"],"addresses":{"network_registry":"0x15a315e1320cff0de84671c0139042ee320ce38d","network_registry_proxy":"0x20559cbd3c2edcd0b396431226c00d2cd102eb3f","channels":"0x77c9414043d27fdc98a6a2d73fc77b9b383092a7","token":"0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1","module_implementation":"0x32863c4974fbb6253e338a0cb70c382dced2efcb","node_safe_registry":"0x4f7c7de3ba2b29ed8b2448df2213ca43f94e45c0","ticket_price_oracle":"0x442df1d946303fb088c9377eefdaea84146da0a6","announcements":"0xf1c143b1ba20c7606d56aa2fa94502d25744b982","node_stake_v2_factory":"0x791d190b2c95397f4bce7bd8032fd67dcea7a5f2"},"confirmations":8,"tx_polling_interval":3000,"max_block_range":1000}},"chains":{"xdai":{"description":"The xDai chain is a stable payments EVM (Ethereum Virtual Machine) blockchain designed for fast and inexpensive transactions","chain_id":100,"live":true,"default_provider":"https://gnosis-provider.rpch.tech","etherscan_api_url":null,"max_fee_per_gas":"10 gwei","max_priority_fee_per_gas":"2 gwei","native_token_name":"xDAI","hopr_token_name":"wxHOPR","block_time":5000,"tags":null}}},"check_unrealized_balance":true},"safe_module":{"safe_transaction_service_provider":"https://xxx.prod.hoprtech.net/","safe_address":"string","module_address":"string"}},"identity":{"file":"/app/hoprd.id","password":"<REDACTED>","private_key":null},"inbox":{"capacity":512,"max_age":900,"excluded_tags":[0]},"api":{"enable":true,"auth":{"Token":"<REDACTED>"},"host":{"address":{"IPv4":"0.0.0.0"},"port":3001}}}';

    const expectedResponse: GetConfigurationResponseType = {
      hopr: {
        host: {
          address: {
            IPv4: '65.109.137.126'
          },
          port: 9091
        },
        db: {
          data: '/app/hoprd-db/db',
          initialize: true,
          force_initialize: false
        },
        strategy: {
          on_fail_continue: true,
          allow_recursive: true,
          strategies: {
            Aggregating: {
              aggregation_threshold: 3,
              unrealized_balance_ratio: 0.95,
              aggregate_on_channel_close: true
            },
            AutoRedeeming: {
              redeem_only_aggregated: true,
              on_close_redeem_single_tickets_value_min:
                '2000000000000000000 HOPR'
            },
            ClosureFinalizer: {
              max_closure_overdue: 3600
            }
          }
        },
        heartbeat: {
          variance: 2,
          interval: 60,
          threshold: 60
        },
        network_options: {
          min_delay: 1,
          max_delay: 300,
          quality_bad_threshold: 0.2,
          quality_offline_threshold: 0.5,
          quality_step: 0.1,
          quality_avg_window_size: 25,
          ignore_timeframe: 600,
          backoff_exponent: 1.5,
          backoff_min: 2,
          backoff_max: 300
        },
        transport: {
          announce_local_addresses: false,
          prefer_local_addresses: false
        },
        protocol: {
          ack: {
            timeout: 15
          },
          heartbeat: {
            timeout: 15
          },
          msg: {
            timeout: 15
          },
          ticket_aggregation: {
            timeout: 15
          }
        },
        chain: {
          announce: true,
          network: 'dufour',
          provider: 'https://gnosis-chain.rpc.rank1.co',
          protocols: {
            networks: {
              'debug-staging': {
                chain: 'xdai',
                environment_type: 'staging',
                version_range: '*',
                indexer_start_block_number: 29521261,
                tags: ['development'],
                addresses: {
                  network_registry:
                    '0xf08e27c3a09627d605bfd164459f7caf18d1d25f',
                  network_registry_proxy:
                    '0x0d1a8f1b13fd1d64696c5e03dd45cd139e40de0c',
                  channels: '0xc060582564b12335cd804339842f5509dbf6f74d',
                  token: '0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1',
                  module_implementation:
                    '0xe8d914ef66b4ff086c6fbcb1e0ea97c0a9d2f3de',
                  node_safe_registry:
                    '0x0bf6bd25ac47fe9d41a99b135cb439b89138f05a',
                  ticket_price_oracle:
                    '0x281a91fea199a3bab5d7d5f05833b257e2fd7741',
                  announcements: '0xd78bca8452b8ea281a659f380e0ef710c64eb85b',
                  node_stake_v2_factory:
                    '0x5f5b459db681996292ad58cc10e88027033149b8'
                },
                confirmations: 8,
                tx_polling_interval: 3000,
                max_block_range: 1000
              },
              dufour: {
                chain: 'xdai',
                environment_type: 'production',
                version_range: '2.*',
                indexer_start_block_number: 29706814,
                tags: ['etherscan'],
                addresses: {
                  network_registry:
                    '0x582b4b586168621daf83beb2aeadb5fb20f8d50d',
                  network_registry_proxy:
                    '0x2bc6b78b0aa892e97714f0e3b1c74487f92c5884',
                  channels: '0x693bac5ce61c720ddc68533991ceb41199d8f8ae',
                  token: '0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1',
                  module_implementation:
                    '0xb7397c218766ebe6a1a634df523a1a7e412e67ea',
                  node_safe_registry:
                    '0xe15c24a0910311c83ac78b5930d771089e93077b',
                  ticket_price_oracle:
                    '0xca5656fe6f2d847aca32cf5f38e51d2054ca1273',
                  announcements: '0x619eabe23fd0e2291b50a507719aa633fe6069b8',
                  node_stake_v2_factory:
                    '0x098b275485c406573d042848d66eb9d63fca311c'
                },
                confirmations: 8,
                tx_polling_interval: 3000,
                max_block_range: 1000
              },
              monte_rosa: {
                chain: 'xdai',
                environment_type: 'production',
                version_range: '1.89||1.90||1.91||1.92||1.93',
                indexer_start_block_number: 24097267,
                tags: ['etherscan'],
                addresses: {
                  network_registry:
                    '0x819e6a81e1e3f96cf1ac9200477c2d09c676959d',
                  network_registry_proxy:
                    '0xca9b1bc189f977b2a9217598d0300d956b6a719f',
                  channels: '0xfabee463f31e39ec8952bbfb4490c41103bf573e',
                  token: '0x66225de86cac02b32f34992eb3410f59de416698',
                  module_implementation:
                    '0x0000000000000000000000000000000000000000',
                  node_safe_registry:
                    '0x0000000000000000000000000000000000000000',
                  ticket_price_oracle:
                    '0x0000000000000000000000000000000000000000',
                  announcements: '0x0000000000000000000000000000000000000000',
                  node_stake_v2_factory:
                    '0x0000000000000000000000000000000000000000'
                },
                confirmations: 8,
                tx_polling_interval: 3000,
                max_block_range: 1000
              },
              rotsee: {
                chain: 'xdai',
                environment_type: 'staging',
                version_range: '2.*',
                indexer_start_block_number: 29690361,
                tags: ['etherscan'],
                addresses: {
                  network_registry:
                    '0x15a315e1320cff0de84671c0139042ee320ce38d',
                  network_registry_proxy:
                    '0x20559cbd3c2edcd0b396431226c00d2cd102eb3f',
                  channels: '0x77c9414043d27fdc98a6a2d73fc77b9b383092a7',
                  token: '0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1',
                  module_implementation:
                    '0x32863c4974fbb6253e338a0cb70c382dced2efcb',
                  node_safe_registry:
                    '0x4f7c7de3ba2b29ed8b2448df2213ca43f94e45c0',
                  ticket_price_oracle:
                    '0x442df1d946303fb088c9377eefdaea84146da0a6',
                  announcements: '0xf1c143b1ba20c7606d56aa2fa94502d25744b982',
                  node_stake_v2_factory:
                    '0x791d190b2c95397f4bce7bd8032fd67dcea7a5f2'
                },
                confirmations: 8,
                tx_polling_interval: 3000,
                max_block_range: 1000
              }
            },
            chains: {
              xdai: {
                description:
                  'The xDai chain is a stable payments EVM (Ethereum Virtual Machine) blockchain designed for fast and inexpensive transactions',
                chain_id: 100,
                live: true,
                default_provider: 'https://gnosis-provider.rpch.tech',
                etherscan_api_url: null,
                max_fee_per_gas: '10 gwei',
                max_priority_fee_per_gas: '2 gwei',
                native_token_name: 'xDAI',
                hopr_token_name: 'wxHOPR',
                block_time: 5000,
                tags: null
              }
            }
          },
          check_unrealized_balance: true
        },
        safe_module: {
          safe_transaction_service_provider: 'https://xxx.prod.hoprtech.net/',
          safe_address: 'string',
          module_address: 'string'
        }
      },
      identity: {
        file: '/app/hoprd.id',
        password: '<REDACTED>',
        private_key: null
      },
      inbox: {
        capacity: 512,
        max_age: 900,
        excluded_tags: [0]
      },
      api: {
        enable: true,
        auth: {
          Token: '<REDACTED>'
        },
        host: {
          address: {
            IPv4: '0.0.0.0'
          },
          port: 3001
        }
      }
    };

    nock(API_ENDPOINT).get('/api/v3/node/configuration').reply(200, response);

    const result = await getConfiguration({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });

    expect(result).toEqual(expectedResponse);
  });

  it('should return a configuration if 200 (2)', async function () {
    const response: string =
      '{"hopr":{"host":{"address":{"Domain":"x.ddns.net"},"port":20004},"db":{"data":"/app/hoprd-db","initialize":true,"force_initialize":false},"strategy":{"on_fail_continue":true,"allow_recursive":false,"strategies":[{"AutoFunding":{"min_stake_threshold":"1000000000000000000 HOPR","funding_amount":"10000000000000000000 HOPR"}},{"Aggregating":{"aggregation_threshold":100,"unrealized_balance_ratio":0.9,"aggregate_on_channel_close":true}},{"AutoRedeeming":{"redeem_only_aggregated":true,"on_close_redeem_single_tickets_value_min":"2000000000000000000 HOPR"}}]},"heartbeat":{"variance":2,"interval":60,"threshold":60},"network_options":{"min_delay":1,"max_delay":300,"quality_bad_threshold":0.2,"quality_offline_threshold":0.5,"quality_step":0.1,"quality_avg_window_size":25,"ignore_timeframe":600,"backoff_exponent":1.5,"backoff_min":2.0,"backoff_max":300.0},"transport":{"announce_local_addresses":false,"prefer_local_addresses":false},"protocol":{"ack":{"timeout":15},"heartbeat":{"timeout":15},"msg":{"timeout":15},"ticket_aggregation":{"timeout":15}},"chain":{"announce":true,"network":"dufour","provider":null,"protocols":{"networks":{"debug-staging":{"chain":"xdai","environment_type":"staging","version_range":"*","indexer_start_block_number":29521261,"tags":["development"],"addresses":{"network_registry":"0xf08e27c3a09627d605bfd164459f7caf18d1d25f","network_registry_proxy":"0x0d1a8f1b13fd1d64696c5e03dd45cd139e40de0c","channels":"0xc060582564b12335cd804339842f5509dbf6f74d","token":"0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1","module_implementation":"0xe8d914ef66b4ff086c6fbcb1e0ea97c0a9d2f3de","node_safe_registry":"0x0bf6bd25ac47fe9d41a99b135cb439b89138f05a","ticket_price_oracle":"0x281a91fea199a3bab5d7d5f05833b257e2fd7741","announcements":"0xd78bca8452b8ea281a659f380e0ef710c64eb85b","node_stake_v2_factory":"0x5f5b459db681996292ad58cc10e88027033149b8"},"confirmations":8,"tx_polling_interval":3000,"max_block_range":1000},"dufour":{"chain":"xdai","environment_type":"production","version_range":"2.*","indexer_start_block_number":29706814,"tags":["etherscan"],"addresses":{"network_registry":"0x582b4b586168621daf83beb2aeadb5fb20f8d50d","network_registry_proxy":"0x2bc6b78b0aa892e97714f0e3b1c74487f92c5884","channels":"0x693bac5ce61c720ddc68533991ceb41199d8f8ae","token":"0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1","module_implementation":"0xb7397c218766ebe6a1a634df523a1a7e412e67ea","node_safe_registry":"0xe15c24a0910311c83ac78b5930d771089e93077b","ticket_price_oracle":"0xca5656fe6f2d847aca32cf5f38e51d2054ca1273","announcements":"0x619eabe23fd0e2291b50a507719aa633fe6069b8","node_stake_v2_factory":"0x098b275485c406573d042848d66eb9d63fca311c"},"confirmations":8,"tx_polling_interval":3000,"max_block_range":1000},"monte_rosa":{"chain":"xdai","environment_type":"production","version_range":"1.89||1.90||1.91||1.92||1.93","indexer_start_block_number":24097267,"tags":["etherscan"],"addresses":{"network_registry":"0x819e6a81e1e3f96cf1ac9200477c2d09c676959d","network_registry_proxy":"0xca9b1bc189f977b2a9217598d0300d956b6a719f","channels":"0xfabee463f31e39ec8952bbfb4490c41103bf573e","token":"0x66225de86cac02b32f34992eb3410f59de416698","module_implementation":"0x0000000000000000000000000000000000000000","node_safe_registry":"0x0000000000000000000000000000000000000000","ticket_price_oracle":"0x0000000000000000000000000000000000000000","announcements":"0x0000000000000000000000000000000000000000","node_stake_v2_factory":"0x0000000000000000000000000000000000000000"},"confirmations":8,"tx_polling_interval":3000,"max_block_range":1000},"rotsee":{"chain":"xdai","environment_type":"staging","version_range":"2.*","indexer_start_block_number":29690361,"tags":["etherscan"],"addresses":{"network_registry":"0x15a315e1320cff0de84671c0139042ee320ce38d","network_registry_proxy":"0x20559cbd3c2edcd0b396431226c00d2cd102eb3f","channels":"0x77c9414043d27fdc98a6a2d73fc77b9b383092a7","token":"0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1","module_implementation":"0x32863c4974fbb6253e338a0cb70c382dced2efcb","node_safe_registry":"0x4f7c7de3ba2b29ed8b2448df2213ca43f94e45c0","ticket_price_oracle":"0x442df1d946303fb088c9377eefdaea84146da0a6","announcements":"0xf1c143b1ba20c7606d56aa2fa94502d25744b982","node_stake_v2_factory":"0x791d190b2c95397f4bce7bd8032fd67dcea7a5f2"},"confirmations":8,"tx_polling_interval":3000,"max_block_range":1000}},"chains":{"xdai":{"description":"The xDai chain is a stable payments EVM (Ethereum Virtual Machine) blockchain designed for fast and inexpensive transactions","chain_id":100,"live":true,"default_provider":"https://gnosis-provider.rpch.tech","etherscan_api_url":null,"max_fee_per_gas":"10 gwei","max_priority_fee_per_gas":"2 gwei","native_token_name":"xDAI","hopr_token_name":"wxHOPR","block_time":5000,"tags":null}}},"check_unrealized_balance":true},"safe_module":{"safe_transaction_service_provider":"https://xxx.prod.hoprtech.net/","safe_address":"string","module_address":"string"}},"identity":{"file":"/app/hoprd-db/.hopr-id-dufour","password":"<REDACTED>","private_key":null},"inbox":{"capacity":512,"max_age":900,"excluded_tags":[0]},"api":{"enable":true,"auth":{"Token":"<REDACTED>"},"host":{"address":{"IPv4":"0.0.0.0"},"port":3001}}}';

    const expectedResponse: GetConfigurationResponseType = {
      hopr: {
        host: {
          address: {
            Domain: 'x.ddns.net'
          },
          port: 20004
        },
        db: {
          data: '/app/hoprd-db',
          initialize: true,
          force_initialize: false
        },
        strategy: {
          on_fail_continue: true,
          allow_recursive: false,
          strategies: {
            AutoFunding: {
              min_stake_threshold: '1000000000000000000 HOPR',
              funding_amount: '10000000000000000000 HOPR'
            },
            Aggregating: {
              aggregation_threshold: 100,
              unrealized_balance_ratio: 0.9,
              aggregate_on_channel_close: true
            },
            AutoRedeeming: {
              redeem_only_aggregated: true,
              on_close_redeem_single_tickets_value_min:
                '2000000000000000000 HOPR'
            }
          }
        },
        heartbeat: {
          variance: 2,
          interval: 60,
          threshold: 60
        },
        network_options: {
          min_delay: 1,
          max_delay: 300,
          quality_bad_threshold: 0.2,
          quality_offline_threshold: 0.5,
          quality_step: 0.1,
          quality_avg_window_size: 25,
          ignore_timeframe: 600,
          backoff_exponent: 1.5,
          backoff_min: 2,
          backoff_max: 300
        },
        transport: {
          announce_local_addresses: false,
          prefer_local_addresses: false
        },
        protocol: {
          ack: {
            timeout: 15
          },
          heartbeat: {
            timeout: 15
          },
          msg: {
            timeout: 15
          },
          ticket_aggregation: {
            timeout: 15
          }
        },
        chain: {
          announce: true,
          network: 'dufour',
          provider: null,
          protocols: {
            networks: {
              'debug-staging': {
                chain: 'xdai',
                environment_type: 'staging',
                version_range: '*',
                indexer_start_block_number: 29521261,
                tags: ['development'],
                addresses: {
                  network_registry:
                    '0xf08e27c3a09627d605bfd164459f7caf18d1d25f',
                  network_registry_proxy:
                    '0x0d1a8f1b13fd1d64696c5e03dd45cd139e40de0c',
                  channels: '0xc060582564b12335cd804339842f5509dbf6f74d',
                  token: '0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1',
                  module_implementation:
                    '0xe8d914ef66b4ff086c6fbcb1e0ea97c0a9d2f3de',
                  node_safe_registry:
                    '0x0bf6bd25ac47fe9d41a99b135cb439b89138f05a',
                  ticket_price_oracle:
                    '0x281a91fea199a3bab5d7d5f05833b257e2fd7741',
                  announcements: '0xd78bca8452b8ea281a659f380e0ef710c64eb85b',
                  node_stake_v2_factory:
                    '0x5f5b459db681996292ad58cc10e88027033149b8'
                },
                confirmations: 8,
                tx_polling_interval: 3000,
                max_block_range: 1000
              },
              dufour: {
                chain: 'xdai',
                environment_type: 'production',
                version_range: '2.*',
                indexer_start_block_number: 29706814,
                tags: ['etherscan'],
                addresses: {
                  network_registry:
                    '0x582b4b586168621daf83beb2aeadb5fb20f8d50d',
                  network_registry_proxy:
                    '0x2bc6b78b0aa892e97714f0e3b1c74487f92c5884',
                  channels: '0x693bac5ce61c720ddc68533991ceb41199d8f8ae',
                  token: '0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1',
                  module_implementation:
                    '0xb7397c218766ebe6a1a634df523a1a7e412e67ea',
                  node_safe_registry:
                    '0xe15c24a0910311c83ac78b5930d771089e93077b',
                  ticket_price_oracle:
                    '0xca5656fe6f2d847aca32cf5f38e51d2054ca1273',
                  announcements: '0x619eabe23fd0e2291b50a507719aa633fe6069b8',
                  node_stake_v2_factory:
                    '0x098b275485c406573d042848d66eb9d63fca311c'
                },
                confirmations: 8,
                tx_polling_interval: 3000,
                max_block_range: 1000
              },
              monte_rosa: {
                chain: 'xdai',
                environment_type: 'production',
                version_range: '1.89||1.90||1.91||1.92||1.93',
                indexer_start_block_number: 24097267,
                tags: ['etherscan'],
                addresses: {
                  network_registry:
                    '0x819e6a81e1e3f96cf1ac9200477c2d09c676959d',
                  network_registry_proxy:
                    '0xca9b1bc189f977b2a9217598d0300d956b6a719f',
                  channels: '0xfabee463f31e39ec8952bbfb4490c41103bf573e',
                  token: '0x66225de86cac02b32f34992eb3410f59de416698',
                  module_implementation:
                    '0x0000000000000000000000000000000000000000',
                  node_safe_registry:
                    '0x0000000000000000000000000000000000000000',
                  ticket_price_oracle:
                    '0x0000000000000000000000000000000000000000',
                  announcements: '0x0000000000000000000000000000000000000000',
                  node_stake_v2_factory:
                    '0x0000000000000000000000000000000000000000'
                },
                confirmations: 8,
                tx_polling_interval: 3000,
                max_block_range: 1000
              },
              rotsee: {
                chain: 'xdai',
                environment_type: 'staging',
                version_range: '2.*',
                indexer_start_block_number: 29690361,
                tags: ['etherscan'],
                addresses: {
                  network_registry:
                    '0x15a315e1320cff0de84671c0139042ee320ce38d',
                  network_registry_proxy:
                    '0x20559cbd3c2edcd0b396431226c00d2cd102eb3f',
                  channels: '0x77c9414043d27fdc98a6a2d73fc77b9b383092a7',
                  token: '0xd4fdec44db9d44b8f2b6d529620f9c0c7066a2c1',
                  module_implementation:
                    '0x32863c4974fbb6253e338a0cb70c382dced2efcb',
                  node_safe_registry:
                    '0x4f7c7de3ba2b29ed8b2448df2213ca43f94e45c0',
                  ticket_price_oracle:
                    '0x442df1d946303fb088c9377eefdaea84146da0a6',
                  announcements: '0xf1c143b1ba20c7606d56aa2fa94502d25744b982',
                  node_stake_v2_factory:
                    '0x791d190b2c95397f4bce7bd8032fd67dcea7a5f2'
                },
                confirmations: 8,
                tx_polling_interval: 3000,
                max_block_range: 1000
              }
            },
            chains: {
              xdai: {
                description:
                  'The xDai chain is a stable payments EVM (Ethereum Virtual Machine) blockchain designed for fast and inexpensive transactions',
                chain_id: 100,
                live: true,
                default_provider: 'https://gnosis-provider.rpch.tech',
                etherscan_api_url: null,
                max_fee_per_gas: '10 gwei',
                max_priority_fee_per_gas: '2 gwei',
                native_token_name: 'xDAI',
                hopr_token_name: 'wxHOPR',
                block_time: 5000,
                tags: null
              }
            }
          },
          check_unrealized_balance: true
        },
        safe_module: {
          safe_transaction_service_provider: 'https://xxx.prod.hoprtech.net/',
          safe_address: 'string',
          module_address: 'string'
        }
      },
      identity: {
        file: '/app/hoprd-db/.hopr-id-dufour',
        password: '<REDACTED>',
        private_key: null
      },
      inbox: {
        capacity: 512,
        max_age: 900,
        excluded_tags: [0]
      },
      api: {
        enable: true,
        auth: {
          Token: '<REDACTED>'
        },
        host: {
          address: {
            IPv4: '0.0.0.0'
          },
          port: 3001
        }
      }
    };

    nock(API_ENDPOINT).get('/api/v3/node/configuration').reply(200, response);

    const result = await getConfiguration({
      apiEndpoint: API_ENDPOINT,
      apiToken: API_TOKEN
    });

    expect(result).toEqual(expectedResponse);
  });
});
