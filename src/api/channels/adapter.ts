import {
  AggregateChannelTicketsPayloadType,
  CloseChannelPayloadType,
  FundChannelsPayloadType,
  GetChannelPayloadType,
  GetChannelsPayloadType,
  GetChannelTicketsPayloadType,
  OpenChannelPayloadType,
  RedeemChannelTicketsPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { aggregateChannelTickets } from './aggregateChannelTickets';
import { closeChannel } from './closeChannel';
import { fundChannel } from './fundChannel';
import { getChannel } from './getChannel';
import { getChannels } from './getChannels';
import { getChannelTickets } from './getChannelTickets';
import { openChannel } from './openChannel';
import { redeemChannelTickets } from './redeemChannelTickets';

const log = createLogger('channels');

export class ChannelsAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `ChannelsAdapter` class.
   * @param apiEndpoint - The API endpoint of the API server.
   * @param apiToken - The API token to use for authentication.
   * @param timeout - optional timeout for all functions
   */
  constructor({
    apiEndpoint,
    apiToken,
    timeout
  }: {
    apiEndpoint: string;
    apiToken: string;
    timeout?: number;
  }) {
    this.apiEndpoint = apiEndpoint;
    this.apiToken = apiToken;
    this.timeout = timeout;
  }

  /**
   * Closes a HOPR channel given a payload that specifies the API endpoint of the HOPR node, and the channel id.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async closeChannel(
    payload: RemoveBasicAuthenticationPayloadType<CloseChannelPayloadType>
  ) {
    return closeChannel({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      channelId: payload.channelId
    });
  }

  public async getChannels(
    payload?: RemoveBasicAuthenticationPayloadType<GetChannelsPayloadType>
  ) {
    return getChannels({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload?.timeout ?? this.timeout,
      fullTopology: payload?.fullTopology,
      includingClosed: payload?.includingClosed
    });
  }

  public async getChannel(
    payload: RemoveBasicAuthenticationPayloadType<GetChannelPayloadType>
  ) {
    return getChannel({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      channelId: payload.channelId
    });
  }

  /**
   * Opens a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the destination, and the amount of HOPR tokens to be staked in the channel.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async openChannel(
    payload: RemoveBasicAuthenticationPayloadType<OpenChannelPayloadType>
  ) {
    return openChannel({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      amount: payload.amount,
      destination: payload.destination
    });
  }

  public async getChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<GetChannelTicketsPayloadType>
  ) {
    return getChannelTickets({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      channelId: payload.channelId
    });
  }

  /**
   * Redeems all the unredeemed HOPR tickets in a channel.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async redeemChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<RedeemChannelTicketsPayloadType>
  ) {
    return redeemChannelTickets({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      channelId: payload.channelId
    });
  }

  public async fundChannel(
    payload: RemoveBasicAuthenticationPayloadType<FundChannelsPayloadType>
  ) {
    return fundChannel({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      amount: payload.amount,
      channelId: payload.channelId
    });
  }

  public async aggregateChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<AggregateChannelTicketsPayloadType>
  ) {
    return aggregateChannelTickets({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      channelId: payload.channelId
    });
  }
}
