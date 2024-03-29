import { ApiAdapter } from './api/adapter';
import { FlowsAdapter } from './flows/adapter';
/**
 * Main SDK class that exposes all functionality of the HOPR SDK.
 */
export class HoprSDK {
  public api: ApiAdapter;
  public flows: FlowsAdapter;

  /**
   * Creates a new instance of the HOPR SDK.
   * @param url - The URL for the HOPR node API.
   * @param apiToken - The API token for the HOPR node.
   */
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
    this.flows = new FlowsAdapter({ apiEndpoint, apiToken, timeout });
  }
}
