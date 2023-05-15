import { createPayloadType, deletePayloadType } from '../../types';
import { create } from './createToken';
import { deleteToken } from './deleteToken';
import { getToken } from './getToken';

/**
 * A class that provides a wrapper around tokens-related API endpoints.
 */
export class TokensAdapter {
  /**
   * Creates a new instance of the `TokensAdapter` class.
   * @param url - The URL of the API server.
   * @param apiKey - The API key to use for authentication.
   */
  constructor(private url: string, private apiKey: string) {}

  /**
   * Create a new authentication token based on the given information.
   * The new token is returned as part of the response body and must be stored by the client.
   * It cannot be read again in cleartext and is lost, if the client loses the token.
   * An authentication has a lifetime. It can be unbound, meaning it will not expire.
   * Or it has a limited lifetime after which it expires.
   * The requested limited lifetime is requested by the client in seconds.
   *
   * @param body - The necessary data to create the token.
   * @returns A Promise that resolves to the generated token which must be used when authenticating for API calls.
   */
  public create(body: createPayloadType) {
    return create(this.url, this.apiKey, body);
  }

  /**
   * Deletes a token. Can only be done before the lifetime expired.
   * After the lifetime expired the token is automatically deleted.
   *
   * @param body - An object that contains the id of the token to be deleted.
   * @returns A Promise that resolves to true if successful.
   */
  public deleteToken(body: deletePayloadType) {
    return deleteToken(this.url, this.apiKey, body);
  }

  /**
   * Get the full token information for the token used in authentication.
   *
   * @returns A Promise that resolves to an object with the token info.
   */
  public getToken() {
    return getToken(this.url, this.apiKey);
  }
}
