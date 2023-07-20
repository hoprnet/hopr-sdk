import {
  BasePayloadType,
  CloseChannelPayloadType,
  FundChannelsPayloadType,
  GetChannelPayloadType,
  OpenChannelPayloadType,
  PeerIdPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { createLogger } from '../../utils';
import { closeChannel } from './closeChannel';
import { fundChannels } from './fundChannels';
import { getChannel } from './getChannel';
import { getChannels } from './getChannels';
import { getChannelsWithFullTopology } from './getChannelsWithFullTopology';
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
   * Closes a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId and the direction of the channel.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async closeChannel(
    payload: RemoveBasicAuthenticationPayloadType<CloseChannelPayloadType>
  ) {
    return closeChannel({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: this.timeout,
      ...payload
    });
  }

  public async fundChannels(
    payload: RemoveBasicAuthenticationPayloadType<FundChannelsPayloadType>
  ) {
    return fundChannels({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: this.timeout,
      ...payload
    });
  }

  public async getChannels(
    payload: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getChannels({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
    });
  }

  public async getChannelsWithFullTopology(
    payload: RemoveBasicAuthenticationPayloadType<BasePayloadType>
  ) {
    return getChannelsWithFullTopology({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: payload.timeout ?? this.timeout
    });
  }

  public async getChannel(
    payload: RemoveBasicAuthenticationPayloadType<GetChannelPayloadType>
  ) {
    return getChannel({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      direction: payload.direction,
      peerId: payload.peerId
    });
  }

  /**
   * Opens a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId, and the amount of HOPR tokens to be staked in the channel.
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
      peerId: payload.peerId
    });
  }

  public async getChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>
  ) {
    return getChannelTickets({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      peerId: payload.peerId
    });
  }

  /**
   * Redeems all the unredeemed HOPR tickets in a channel.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async redeemChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>
  ) {
    return redeemChannelTickets({
      apiToken: this.apiToken,
      apiEndpoint: this.apiEndpoint,
      timeout: payload.timeout ?? this.timeout,
      peerId: payload.peerId
    });
  }
}
