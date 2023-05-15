import { GetPeersPayloadType, PingNodePayloadType } from '../../types';
import { getEntryNodes } from './getEntryNodes';
import { getInfo } from './getInfo';
import { getMetrics } from './getMetrics';
import { getPeers } from './getPeers';
import { getVersion } from './getVersion';
import { pingNode } from './pingNode';

export class NodeAdapter {
  constructor(private url: string, private apiKey: string) {}

  public getEntryNodes() {
    return getEntryNodes(this.url, this.apiKey);
  }

  public getInfo() {
    return getInfo(this.url, this.apiKey);
  }

  public getMetrics() {
    return getMetrics(this.url, this.apiKey);
  }

  public getPeers(body?: GetPeersPayloadType) {
    return getPeers(this.url, this.apiKey, body);
  }

  public getVersion() {
    return getVersion(this.url, this.apiKey);
  }

  public pingNode(body: PingNodePayloadType) {
    return pingNode(this.url, this.apiKey, body);
  }
}
