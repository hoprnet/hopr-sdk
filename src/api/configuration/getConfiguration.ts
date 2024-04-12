import { ZodError } from 'zod';
import {
  APIErrorResponse,
  BasePayloadType,
  GetConfigurationResponse,
  GetConfigurationResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Get the configuration of your node.
 * Configuration is not type safe
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to use for authentication.
 * @returns An object with configuration of your node.
 * @throws An error that occurred while processing the request.
 */
export const getConfiguration = async (
  payload: BasePayloadType
): Promise<GetConfigurationResponseType> => {
  const url = new URL(`api/v3/node/configuration`, payload.apiEndpoint);
  const rawResponse = await fetchWithTimeout(
    url,
    {
      method: 'GET',
      headers: getHeaders(payload.apiToken)
    },
    payload.timeout
  );

  // received unexpected error from server
  if (rawResponse.status > 499) {
    throw new Error(rawResponse.statusText);
  }

  let jsonResponse: any;

  try {
    jsonResponse = await rawResponse.json();
  } catch (e) {
    throw new APIError({
      status: rawResponse.status,
      statusText: rawResponse.statusText,
      error: 'Failed parsing response'
    });
  }

  let parsedStrategies: {
    [key: string]: {
      [key: string]: string | number | boolean;
    };
  } = {};

  /*
    Exapmple of jsonResponse.hoprd.strategies:
    "strategies":[
        {
          "Aggregating":{
              "aggregation_threshold":3,
              "unrealized_balance_ratio":0.95,
              "aggregate_on_channel_close":true
          },
        },
        {
          "AutoRedeeming":{
              "redeem_only_aggregated":true,
              "on_close_redeem_single_tickets_value_min":"2000000000000000000 HOPR"
          }
        },
        {
          "ClosureFinalizer":{
              "max_closure_overdue":3600
          }
        }
    ]
  */

  jsonResponse.hopr.strategy.strategies.forEach(
    (strategyObj: {
      [key: string]: { [key: string]: string | number | boolean };
    }) => {
      try {
        const strategyName = Object.keys(strategyObj)[0];
        if (typeof strategyName !== 'string') return;
        let tmp = strategyObj[strategyName];
        if (!tmp) return;
        parsedStrategies[strategyName] = tmp;
      } catch (e) {}
    }
  );

  jsonResponse.hopr.strategy.strategies = parsedStrategies;

  return jsonResponse;
};
