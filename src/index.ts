import * as api from './api';
import { apiWrapper } from './apiWrapper';
import { WrappedApi } from './types';
export default class SDK {
  public api: WrappedApi<typeof api>;
  constructor(private url: string, private apiToken: string) {
    // create wrapped version of the api
    // this api does not need url and apiToken in params
    this.api = (Object.keys(api) as (keyof typeof api)[]).reduce((acc, key) => {
      (acc[key] as WrappedApi<typeof api>[keyof WrappedApi<typeof api>]) =
        apiWrapper(api[key], this.url, this.apiToken);
      return acc;
    }, {} as WrappedApi<typeof api>);
  }
}
