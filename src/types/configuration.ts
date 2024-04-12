import { z } from 'zod';
import { BasePayload } from './general';

/**
 * Get node configuration
 */

export const GetConfigurationPayload = BasePayload;

export type GetConfigurationPayloadType = z.infer<
  typeof GetConfigurationPayload
>;

const NetworkPayload = z.object({
  chain: z.string(),
  environment_type: z.string(),
  version_range: z.string(),
  indexer_start_block_number: z.number(),
  tags: z.array(z.string()).nullable(),
  addresses: z.object({
    network_registry: z.string(),
    network_registry_proxy: z.string(),
    channels: z.string(),
    token: z.string(),
    module_implementation: z.string(),
    node_safe_registry: z.string(),
    ticket_price_oracle: z.string(),
    announcements: z.string(),
    node_stake_v2_factory: z.string()
  }),
  confirmations: z.number(),
  tx_polling_interval: z.number(),
  max_block_range: z.number()
});

export type NetworkPayloadType = z.infer<typeof NetworkPayload>;
const NetworkStore = z.record(z.string(), NetworkPayload);

const ChainPayload = z.object({
  description: z.string().nullable(),
  chain_id: z.number(),
  live: z.boolean(),
  default_provider: z.string().nullable(),
  etherscan_api_url: z.string().nullable(),
  max_fee_per_gas: z.string().nullable(),
  max_priority_fee_per_gas: z.string().nullable(),
  native_token_name: z.string().nullable(),
  hopr_token_name: z.string().nullable(),
  block_time: z.number().nullable(),
  tags: z.array(z.string()).nullable()
});

export type ChainPayloadType = z.infer<typeof ChainPayload>;
const ChainStore = z.record(z.string(), ChainPayload);

const Strategy = z.record(
  z.string(),
  z.string().or(z.number()).or(z.boolean())
);
const StrategiesPayload = z.record(z.string(), Strategy);
export type StrategiesPayloadType = z.infer<typeof StrategiesPayload>;

export const GetConfigurationResponse = z.any();

/*  Currently the full type of the response is unknown

export const GetConfigurationResponse = z.object({
    hopr: z.object({
        host: z.object({
          address: z.object({
            IPv4: z.string().nullable().optional(),
            Domain: z.string().nullable().optional(),
          }),
          port: z.number(),
        }),
        db: z.object({
          data: z.string(),
          initialize: z.boolean(),
          force_initialize: z.boolean()
        }),
        strategy: z.object({
          on_fail_continue: z.boolean(),
          allow_recursive: z.boolean(),
          strategies: StrategiesPayload,
        }),
        heartbeat: z.object({
          variance: z.number(),
          interval: z.number(),
          threshold: z.number(),
        }),
        network_options: z.object({
          min_delay: z.number(),
          max_delay: z.number(),
          quality_bad_threshold: z.number(),
          quality_offline_threshold: z.number(),
          quality_step: z.number(),
          quality_avg_window_size: z.number(),
          ignore_timeframe: z.number(),
          backoff_exponent: z.number(),
          backoff_min: z.number(),
          backoff_max: z.number(),
        }),
        transport: z.object({
          announce_local_addresses: z.boolean(),
          prefer_local_addresses: z.boolean()
        }),
        protocol: z.object({
          ack: z.object({
            timeout: z.number(),
          }),
          heartbeat: z.object({
            timeout: z.number(),
          }),
          msg: z.object({
            timeout: z.number(),
          }),
          ticket_aggregation: z.object({
            timeout: z.number(),
          })
        }),
        chain: z.object({
          announce: z.boolean(),
          network: z.string(),
          provider: z.string().nullable(),
          protocols: z.object({
            networks: NetworkStore,
            chains: ChainStore
          }),
          check_unrealized_balance: z.boolean(),
        }),
        safe_module: z.object({
          safe_transaction_service_provider: z.string(),
          safe_address: z.string(),
          module_address: z.string(),
        })
    }),
    identity: z.object({
      file: z.string().nullable(),
      password: z.string().nullable(),
      private_key: z.string().nullable(),
    }),
    inbox: z.object({
      capacity: z.number().nullable(),
      max_age: z.number().nullable(),
      excluded_tags: z.array(z.number()).nullable(),
    }),
    api: z.object({
      enable: z.boolean(),
      auth: z.object({
        Token: z.string(),
      }),
      host: z.object({
        address: z.object({
          IPv4: z.string(),
        }),
        port: z.number(),
      })
    }),
  });


*/

export type GetConfigurationResponseType = z.infer<
  typeof GetConfigurationResponse
>;
