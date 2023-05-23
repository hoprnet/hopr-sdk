import { getEntryNodes } from "./getEntryNodes";
import { getInfo } from "./getInfo";
import { getMetrics } from "./getMetrics";
import { getPeers } from "./getPeers";
import { getVersion } from "./getVersion";
import { pingNode } from "./pingNode";
class NodeAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getEntryNodes() {
    return getEntryNodes({ url: this.url, apiKey: this.apiKey });
  }
  getInfo() {
    return getInfo({ url: this.url, apiKey: this.apiKey });
  }
  getMetrics() {
    return getMetrics({ url: this.url, apiKey: this.apiKey });
  }
  getPeers(payload) {
    return getPeers({
      url: this.url,
      apiKey: this.apiKey,
      quality: payload.quality
    });
  }
  getVersion() {
    return getVersion({ url: this.url, apiKey: this.apiKey });
  }
  pingNode(payload) {
    return pingNode({
      url: this.url,
      apiKey: this.apiKey,
      peerId: payload.peerId
    });
  }
}
export {
  NodeAdapter
};
