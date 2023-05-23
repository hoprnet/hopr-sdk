import { getPeerInfo } from "./getPeerInfo";
class PeerInfoAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getPeerInfo(payload) {
    return getPeerInfo({
      url: this.url,
      apiKey: this.apiKey,
      peerId: payload.peerId
    });
  }
}
export {
  PeerInfoAdapter
};
