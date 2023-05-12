import { getPeerInfo } from "./getPeerInfo";
class PeerInfoWrapper {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  getPeerInfo(body) {
    return getPeerInfo(this.url, this.apiKey, body);
  }
}
export {
  PeerInfoWrapper
};
