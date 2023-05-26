import { ApiAdapter } from './api/adapter';
export class HoprSdk {
  public api: ApiAdapter;
  constructor({
    url,
    apiKey,
    timeout
  }: {
    url: string;
    apiKey: string;
    timeout?: number;
  }) {
    this.api = new ApiAdapter({ url, apiKey, timeout });
  }
}
