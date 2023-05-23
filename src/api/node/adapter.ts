import {
  GetPeersPayloadType,
  PingNodePayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { getEntryNodes } from './getEntryNodes';
import { getInfo } from './getInfo';
import { getMetrics } from './getMetrics';
import { getPeers } from './getPeers';
import { getVersion } from './getVersion';
import { pingNode } from './pingNode';

export class NodeAdapter {
  constructor(private url: string, private apiKey: string) {}

  public getEntryNodes() {
    return getEntryNodes({ url: this.url, apiKey: this.apiKey });
  }

  public getInfo() {
    return getInfo({ url: this.url, apiKey: this.apiKey });
  }

  public getMetrics() {
    return getMetrics({ url: this.url, apiKey: this.apiKey });
  }

  public getPeers(
    payload: RemoveBasicAuthenticationPayloadType<GetPeersPayloadType>
  ) {
    return getPeers({
      url: this.url,
      apiKey: this.apiKey,
      quality: payload.quality
    });
  }

  public getVersion() {
    return getVersion({ url: this.url, apiKey: this.apiKey });
  }

  public pingNode(
    payload: RemoveBasicAuthenticationPayloadType<PingNodePayloadType>
  ) {
    return pingNode({
      url: this.url,
      apiKey: this.apiKey,
      peerId: payload.peerId
    });
  }
}
