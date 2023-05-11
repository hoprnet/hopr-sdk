import * as api from './api';

export class ApiWrapper {
  public channels: api.ChannelsWrapper;
  public node: api.NodeWrapper;
  public peerInfo: api.PeerInfoWrapper;
  public settings: api.SettingsWrapper;
  public tickets: api.TicketsWrapper;
  constructor(private url: string, private apiKey: string) {
    this.channels = new api.ChannelsWrapper(this.url, this.apiKey);
    this.node = new api.NodeWrapper(this.url, this.apiKey);
    this.peerInfo = new api.PeerInfoWrapper(this.url, this.apiKey);
    this.settings = new api.SettingsWrapper(this.url, this.apiKey);
    this.tickets = new api.TicketsWrapper(this.url, this.apiKey);
  }
}
