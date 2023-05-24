import { ApiAdapter } from './api/adapter';
export class HoprSdk {
  public api: ApiAdapter;
  constructor({ url, apiToken }: { url: string; apiToken: string }) {
    this.api = new ApiAdapter(url, apiToken);
  }
}
