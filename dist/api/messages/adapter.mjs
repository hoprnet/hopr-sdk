import { sendMessage } from "./sendMessage";
import { sign } from "./sign";
import { websocket } from "./websocket";
class MessagesAdapter {
  constructor(url, apiKey) {
    this.url = url;
    this.apiKey = apiKey;
  }
  sendMessage(payload) {
    return sendMessage({
      apiKey: this.apiKey,
      url: this.url,
      body: payload.body,
      recipient: payload.recipient,
      hops: payload.hops,
      path: payload.path
    });
  }
  sign(payload) {
    return sign({
      apiKey: this.apiKey,
      url: this.url,
      message: payload.message
    });
  }
  websocket() {
    return websocket({
      apiKey: this.apiKey,
      url: this.url
    });
  }
}
export {
  MessagesAdapter
};
