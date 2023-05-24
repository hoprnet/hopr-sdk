import {
  CreateTokenPayloadType,
  DeleteTokenPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
import { createToken } from './createToken';
import { deleteToken } from './deleteToken';
import { getToken } from './getToken';

const log = createLogger('tokens');

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
   * @param payload - The necessary data to create the token.
   * @returns A Promise that resolves to the generated token which must be used when authenticating for API calls.
   */
  public async createToken(
    payload: RemoveBasicAuthenticationPayloadType<CreateTokenPayloadType>
  ) {
    try {
      return await createToken({
        url: this.url,
        apiKey: this.apiKey,
        capabilities: payload.capabilities,
        description: payload.description,
        lifetime: payload.lifetime
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Deletes a token. Can only be done before the lifetime expired.
   * After the lifetime expired the token is automatically deleted.
   *
   * @param payload - An object that contains the id of the token to be deleted.
   * @returns A Promise that resolves to true if successful.
   */
  public async deleteToken(
    payload: RemoveBasicAuthenticationPayloadType<DeleteTokenPayloadType>
  ) {
    try {
      return await deleteToken({
        url: this.url,
        apiKey: this.apiKey,
        id: payload.id
      });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }

  /**
   * Get the full token information for the token used in authentication.
   *
   * @returns A Promise that resolves to an object with the token info.
   */
  public async getToken() {
    try {
      return await getToken({ url: this.url, apiKey: this.apiKey });
    } catch (e) {
      if (e instanceof APIError) {
        const { message, error, status } = e;
        log.error({ status, error, message });
      } else {
        log.error(e);
      }
    }
  }
}
