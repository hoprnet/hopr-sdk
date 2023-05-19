import {
  GetPeerInfoPayloadType,
  RemoveBasicAuthenticationPayloadType
} from '../../types';
import { getPeerInfo } from './getPeerInfo';

export class PeerInfoAdapter {
  constructor(private url: string, private apiKey: string) {}

  public getPeerInfo(
    payload: RemoveBasicAuthenticationPayloadType<GetPeerInfoPayloadType>
  ) {
    return getPeerInfo({
      url: this.url,
      apiKey: this.apiKey,
      peerId: payload.peerId
    });
  }
}
