import { ApiAdapter } from './api/adapter';
export class HoprSDK {
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
