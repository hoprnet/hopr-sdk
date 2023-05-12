import { getEntryNodes } from "./getEntryNodes";
import { getInfo } from "./getInfo";
import { getMetrics } from "./getMetrics";
import { getPeers } from "./getPeers";
import { getVersion } from "./getVersion";
import { pingNode } from "./pingNode";
class NodeWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getEntryNodes() {
    return getEntryNodes(this.url, this.apiKey);
  }
  getInfo() {
    return getInfo(this.url, this.apiKey);
  }
  getMetrics() {
    return getMetrics(this.url, this.apiKey);
  }
  getPeers(body) {
    return getPeers(this.url, this.apiKey, body);
  }
  getVersion() {
    return getVersion(this.url, this.apiKey);
  }
  pingNode(body) {
    return pingNode(this.url, this.apiKey, body);
  }
}
export {
  NodeWrapper
};
