import * as ws from 'ws';
import { RemoveBasicAuthenticationPayloadType } from '../../types/general.js';
import { SendMessagePayloadType, SignPayloadType } from '../../types/messages.js';
import 'zod';

declare class MessagesAdapter {
    private url;
    private apiKey;
    constructor(url: string, apiKey: string);
    sendMessage(payload: RemoveBasicAuthenticationPayloadType<SendMessagePayloadType>): Promise<string>;
    sign(payload: RemoveBasicAuthenticationPayloadType<SignPayloadType>): Promise<string>;
    websocket(): ws;
}

export { MessagesAdapter };
