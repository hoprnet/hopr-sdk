import { ApiAdapter } from "./api";
class SDK {
  constructor(url, apiToken) {
    this.url = url;
    this.apiToken = apiToken;
    this.api = new ApiAdapter(this.url, this.apiToken);
  }
}
export {
  SDK
};
