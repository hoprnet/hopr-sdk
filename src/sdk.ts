import { ApiWrapper } from './api';
export class SDK {
  public api: ApiWrapper;
  constructor(private url: string, private apiToken: string) {
    this.api = new ApiWrapper(this.url, this.apiToken);
  }
}
