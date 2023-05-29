import { ApiAdapter } from './api/adapter';
export class HoprSdk {
  public api: ApiAdapter;
  constructor({
    apiEndpoint,
    apiToken,
    timeout
  }: {
    apiEndpoint: string;
    apiToken: string;
    timeout?: number;
  }) {
    this.api = new ApiAdapter({ apiEndpoint, apiToken, timeout });
  }
}
