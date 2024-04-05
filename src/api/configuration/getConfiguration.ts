import { ZodError } from 'zod';
import {
  APIErrorResponse,
  BasePayloadType,
  GetConfigurationResponse,
  GetConfigurationResponseType
} from '../../types';
import { APIError, fetchWithTimeout, getHeaders } from '../../utils';

/**
 * Get all aliases you set previously and their corresponding peer IDs.
 *
 * @param apiEndpoint - The API endpoint
 * @param apiToken - The API token to use for authentication.
 * @returns An object with alias names as keys and the peerId associated with the alias.
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

  const tesxtResponse = await rawResponse.text();
  const jsonResponse = JSON.parse(tesxtResponse);

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

  console.log(jsonResponse.hopr.strategy);

  jsonResponse.hopr.strategy.strategies.forEach((strategyObj: {[key: string]: {[key: string]: string | number | boolean}}) => {
    try{
      const strategyName = Object.keys(strategyObj)[0];
      if(typeof(strategyName) !== 'string') return;
      let tmp = strategyObj[strategyName];
      if(!tmp) return;
      parsedStrategies[strategyName] = tmp;
    } catch (e) {}
  })

  jsonResponse.hopr.strategy.strategies = parsedStrategies;

  console.log('jsonResponse', jsonResponse);

  const parsedRes = GetConfigurationResponse.safeParse(jsonResponse);

  console.log('parsedRes', parsedRes);
  // received expected response
  if (parsedRes.success) {
    return parsedRes.data;
  }

  // check if response has the structure of an expected api error
  const isApiErrorResponse = APIErrorResponse.safeParse(jsonResponse);

  if (isApiErrorResponse.success) {
    throw new APIError(isApiErrorResponse.data);
  }

  console.log('isApiErrorResponse', isApiErrorResponse);

  // we could not parse the response and it is not unexpected
  throw new ZodError(parsedRes.error.issues);
};
