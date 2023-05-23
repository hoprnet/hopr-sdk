import { ApiAdapter } from './api';
import { createLogger } from './utils';

const log = createLogger('HoprSdk');

export class HoprSdk {
  public api: ApiAdapter;
  constructor(private url: string, private apiToken: string) {
    this.api = new ApiAdapter(this.url, this.apiToken);
  }

  public async safeSendMessage([payload]: Parameters<
    ApiAdapter['messages']['sendMessage']
  >) {
    // check if outgoing channels
    const channels = await this.api.channels.getChannels();
    const hasAtLeastOneOutgoingChannel =
      channels.outgoing.length &&
      channels.outgoing.find((channel) => channel.status === 'Open');
    if (!hasAtLeastOneOutgoingChannel) {
      log.debug(
        'could not find one outgoing channel that is open',
        channels.outgoing.length
      );
      return;
    }

    return await this.api.messages.sendMessage(payload);
  }
}
