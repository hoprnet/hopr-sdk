import { GetPeerInfoPayloadType } from '../../types';
import { getPeerInfo } from './getPeerInfo';

export class PeerInfoAdapter {
  constructor(private url: string, private apiKey: string) {}

  public getPeerInfo(body: GetPeerInfoPayloadType) {
    return getPeerInfo(this.url, this.apiKey, body);
  }
}
