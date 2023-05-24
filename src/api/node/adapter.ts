import {
  GetPeersPayloadType,
  PingNodePayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
import { getEntryNodes } from './getEntryNodes';
import { getInfo } from './getInfo';
import { getMetrics } from './getMetrics';
import { getPeers } from './getPeers';
import { getVersion } from './getVersion';
import { pingNode } from './pingNode';

const log = createLogger('node');

export class NodeAdapter {
  private url: string;
  private apiKey: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `NodeAdapter` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   * @param timeout - optional timeout for all functions
   */
  constructor({
    url,
    apiKey
  }: {
    url: string;
    apiKey: string;
    timeout?: number;
  }) {
    this.url = url;
    this.apiKey = apiKey;
    this.timeout = this.timeout;
  }

  public async getEntryNodes() {
    try {
      return await getEntryNodes({
        url: this.url,
        apiKey: this.apiKey,
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

  public async getInfo() {
    try {
      return await getInfo({
        url: this.url,
        apiKey: this.apiKey,
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

  public async getMetrics() {
    try {
      return await getMetrics({
        url: this.url,
        apiKey: this.apiKey,
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

  public async getPeers(
    payload: RemoveBasicAuthenticationPayloadType<GetPeersPayloadType>
  ) {
    try {
      return await getPeers({
        url: this.url,
        apiKey: this.apiKey,
        timeout: this.timeout,
        quality: payload.quality
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

  public async getVersion() {
    try {
      return await getVersion({
        url: this.url,
        apiKey: this.apiKey,
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

  public async pingNode(
    payload: RemoveBasicAuthenticationPayloadType<PingNodePayloadType>
  ) {
    try {
      return await pingNode({
        url: this.url,
        apiKey: this.apiKey,
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
