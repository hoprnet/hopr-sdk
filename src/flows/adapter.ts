import { RemoveBasicAuthenticationPayloadType } from '../types';
import { openMultipleChannels } from './openMultipleChannels';
import { cashOut } from './cashOut';
import { safeSendMessage } from './safeSendMessage';
import { getOutgoingChannels } from './getOutgoingChannels';
import { closeEverything } from './closeEverything';
import {
  CashOutPayloadType,
  GetOutgoingChannelsPayloadType,
  OpenMultipleChannelsPayloadType
} from '../types/flows';
import { SendMessagePayloadType } from '../types/messages';

export class FlowsAdapter {
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `FlowsAdaptor` class.
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
   * Opens multiple channels.
   *
   * @param payload - The payload to open multiple channels consisting of:
   * - `peerIds`: An array of the peer Ids to the node we want to open channels to.
   * - `amount`: How much currency we want to open the channel and fund it with.
   * @returns A Promise that resolves with keyed by the peerId containing the channel Id and receipt.
   */
  public async openMultipleChannels(
    payload: RemoveBasicAuthenticationPayloadType<OpenMultipleChannelsPayloadType>
  ) {
    return openMultipleChannels({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      ...payload
    });
  }

  /**
   * Initiates a cash-out operation.
   *
   * @param payload - The payload to initiate a cash-out operation consisting of:
   *  - `recipient`: The blockchain address to where the cash-out will be mode.
   * @returns A Promise that resolves with an object containing `native` and `hopr` properties,
   * where each property is a string representing information related to the cash-out operation.
   */
  public async cashOut(
    payload: RemoveBasicAuthenticationPayloadType<CashOutPayloadType>
  ) {
    return cashOut({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      ...payload
    });
  }

  /**
   * Sends a safe message using the `SendMessagePayloadType` payload.
   *
   * @param payload - The payload to send a safe message consisting of:
   *   - `body`: The message body to send.
   *   - `recipient`: The recipient of the message.
   *   - `path`: The path to take for the message, if any.
   *   - `hops`: The number of hops to take for the message, if any.
   *
   * @returns A Promise that resolves with a string representing the sent message, or `undefined`
   * if the message sending was not successful.
   */
  public async safeSendMessage(
    payload: RemoveBasicAuthenticationPayloadType<SendMessagePayloadType>
  ) {
    return safeSendMessage({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      ...payload
    });
  }

  /**
   * Retrieves outgoing channels.
   *
   * @param payload - The status to filter the outgoing channels by.
   *
   * @returns A Promise that resolves with an array of objects, where each object represents
   * an outgoing channel with properties:
   *   - `type`: Either "incoming" or "outgoing" indicating the channel type.
   *   - `status`: The status of the channel, which can be one of "Open", "WaitingForCommitment",
   *      "PendingToClose", or "Closed".
   *   - `channelId`: A string representing the channel ID.
   *   - `peerId`: A string representing the peer ID of the channel.
   *   - `balance`: A string representing the current balance of the channel.
   */
  public async getOutgoingChannels(
    payload: RemoveBasicAuthenticationPayloadType<GetOutgoingChannelsPayloadType>
  ) {
    return getOutgoingChannels({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout,
      ...payload
    });
  }

  /**
   * Closes everything and performs cleanup.
   *
   * @returns A Promise that resolves with an object containing information about the closed channels
   * and redeemed tickets. The object has two properties:
   *   - `closedChannels`: An array of objects, where each object represents a closed channel and has
   *       properties:
   *       - `channelStatus`: A string representing the status of the closed channel.
   *       - `receipt`: An optional string representing a receipt associated with the closed channel,
   *          or `undefined` if no receipt is available.
   *   - `redeemedTickets`: A boolean value indicating whether the tickets were redeemed successfully.
   */
  public async closeEverything() {
    return closeEverything({
      apiEndpoint: this.apiEndpoint,
      apiToken: this.apiToken,
      timeout: this.timeout
    });
  }
}
