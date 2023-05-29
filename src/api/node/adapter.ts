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
  private apiEndpoint: string;
  private apiToken: string;
  private timeout: number | undefined;

  /**
   * Creates a new instance of the `NodeAdapter` class.
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

  public async getEntryNodes() {
    try {
      return await getEntryNodes({
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

  public async getInfo() {
    try {
      return await getInfo({
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

  public async getMetrics() {
    try {
      return await getMetrics({
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

  public async getPeers(
    payload: RemoveBasicAuthenticationPayloadType<GetPeersPayloadType>
  ) {
    try {
      return await getPeers({
        apiEndpoint: this.apiEndpoint,
        apiToken: this.apiToken,
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

  public async pingNode(
    payload: RemoveBasicAuthenticationPayloadType<PingNodePayloadType>
  ) {
    try {
      return await pingNode({
        apiEndpoint: this.apiEndpoint,
        apiToken: this.apiToken,
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
