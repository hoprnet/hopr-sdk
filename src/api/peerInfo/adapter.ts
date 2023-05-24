import {
  GetPeerInfoPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { APIError, createLogger } from '../../utils';
import { getPeerInfo } from './getPeerInfo';

const log = createLogger('peerInfo');

export class PeerInfoAdapter {
  constructor(private url: string, private apiKey: string) {}

  public async getPeerInfo(
    payload: RemoveBasicAuthenticationPayloadType<GetPeerInfoPayloadType>
  ) {
    try {
      return await getPeerInfo({
        url: this.url,
        apiKey: this.apiKey,
        peerId: payload.peerId
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
}
