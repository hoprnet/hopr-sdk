import { ApiAdapter } from './api';
export class SDK {
  public api: ApiAdapter;
  constructor(private url: string, private apiToken: string) {
    this.api = new ApiAdapter(this.url, this.apiToken);
  }
}
