import { ApiWrapper } from "./api";
class SDK {
  constructor(url, apiToken) {
    this.url = url;
    this.apiToken = apiToken;
    this.api = new ApiWrapper(this.url, this.apiToken);
  }
}
export {
  SDK
};
