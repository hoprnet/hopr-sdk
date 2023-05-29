import {
  CloseChannelPayloadType,
  FundChannelsPayloadType,
  GetChannelPayloadType,
  OpenChannelPayloadType,
  PeerIdPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
import { closeChannel } from './closeChannel';
import { fundChannels } from './fundChannels';
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
    apiToken
  }: {
    apiEndpoint: string;
    apiToken: string;
    timeout?: number;
  }) {
    this.apiEndpoint = apiEndpoint;
    this.apiToken = apiToken;
    this.timeout = this.timeout;
  }

  /**
   * Closes a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId and the direction of the channel.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async closeChannel(
    payload: RemoveBasicAuthenticationPayloadType<CloseChannelPayloadType>
  ) {
    try {
      return await closeChannel({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint,
        timeout: this.timeout,
        direction: payload.direction,
        peerId: payload.peerId
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  public async fundChannels(
    payload: RemoveBasicAuthenticationPayloadType<FundChannelsPayloadType>
  ) {
    try {
      return await fundChannels({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint,
        timeout: this.timeout,
        incomingAmount: payload.incomingAmount,
        outgoingAmount: payload.outgoingAmount,
        peerId: payload.peerId
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  public async getChannels() {
    try {
      return await getChannels({
        apiEndpoint: this.apiEndpoint,
        apiToken: this.apiToken,
        timeout: this.timeout
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  public async getChannel(
    payload: RemoveBasicAuthenticationPayloadType<GetChannelPayloadType>
  ) {
    try {
      return await getChannel({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint,
        timeout: this.timeout,
        direction: payload.direction,
        peerId: payload.peerId
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Opens a HOPR channel given a payload that specifies the API endpoint of the HOPR node, the peerId, and the amount of HOPR tokens to be staked in the channel.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async openChannel(
    payload: RemoveBasicAuthenticationPayloadType<OpenChannelPayloadType>
  ) {
    try {
      return await openChannel({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint,
        timeout: this.timeout,
        amount: payload.amount,
        peerId: payload.peerId
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  public async getChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>
  ) {
    try {
      return await getChannelTickets({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint,
        timeout: this.timeout,
        peerId: payload.peerId
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Redeems all the unredeemed HOPR tickets in a channel.
   * This operation may take more than 5 minutes to complete as it involves on-chain operations.
   */
  public async redeemChannelTickets(
    payload: RemoveBasicAuthenticationPayloadType<PeerIdPayloadType>
  ) {
    try {
      return await redeemChannelTickets({
        apiToken: this.apiToken,
        apiEndpoint: this.apiEndpoint,
        timeout: this.timeout,
        peerId: payload.peerId
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }
}
