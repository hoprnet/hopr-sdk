import http from 'http';
import WS from 'isomorphic-ws';
import WebsocketHelper from './ws-helper';

const ENCODED_HOPRD_MESSAGE = `249,1,150,185,1,140,52,124,57,54,50,54,48,54,124,53,124,55,124,50,97,56,51,49,51,100,48,50,55,55,102,48,51,102,51,97,100,51,54,50,52,48,54,54,100,48,100,101,98,102,102,101,52,97,97,52,55,55,51,48,99,53,102,102,56,48,100,52,99,102,50,51,53,98,50,49,48,51,99,102,48,54,51,49,55,53,53,99,50,100,101,56,102,98,49,100,97,97,51,98,48,49,54,99,54,54,52,49,57,100,55,97,48,52,55,55,102,55,53,97,50,50,54,102,51,56,55,53,97,50,57,99,100,52,51,101,49,100,51,49,53,48,48,52,99,100,54,97,49,51,48,56,100,50,100,100,50,49,98,55,54,53,98,101,97,49,102,101,48,50,57,56,100,49,97,54,54,100,57,101,99,54,102,98,98,49,97,53,52,98,48,101,100,98,49,56,99,48,98,98,53,98,48,97,54,56,102,54,56,53,56,55,54,98,98,57,49,57,50,102,53,56,55,55,48,56,53,102,101,57,55,52,55,55,51,54,57,51,99,54,52,53,97,50,100,50,99,97,51,51,101,53,48,102,55,53,50,97,56,97,98,54,101,53,55,102,55,51,50,97,51,100,50,98,99,101,49,52,52,102,99,100,52,52,52,56,99,49,49,99,56,102,98,49,53,57,57,98,49,101,97,53,100,100,99,99,52,49,102,99,98,57,56,97,98,55,101,56,100,53,49,55,57,102,57,101,53,52,54,101,98,100,101,55,102,52,56,56,48,48,101,100,55,102,52,102,101,98,50,97,48,52,50,98,101,57,98,56,51,49,56,97,53,50,52,52,52,52,50,56,100,53,99,52,52,102,56,101,102,97,57,53,53,102,52,50,54,51,57,53,55,48,49,54,56,98,49,48,53,57,98,99,134,1,135,205,141,225,198`;

describe('test ws class', function () {
  const apiEndpoint = 'ws://localhost:1234';
  const apiToken = '';
  let server: WS.Server;
  let httpServer: http.Server;

  beforeEach(function () {
    httpServer = http.createServer();
    server = new WS.Server({ server: httpServer });
    httpServer.listen(1234);
  });

  afterEach(() => {
    server.close();
    httpServer.close();
    jest.clearAllMocks();
  });

  it('gets a successful connection', (done) => {
    let connection: WebsocketHelper;
    const onMessageSpy = jest.fn((_data: string) => {
      // on message listener works
      connection.close();
      done();
    });

    server.on('connection', (ws) => {
      ws.on('message', () => {
        ws.send(ENCODED_HOPRD_MESSAGE);
      });
    });

    connection = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      onMessage: onMessageSpy
    });
    connection.waitUntilSocketOpen().then((conn) => {
      conn.send('i am connected');
    });
  });
  it('connection is lost and re-established', (done) => {
    const reconnectDelay = 10;
    const connection = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      reconnectDelay,
      attemptToReconnect: true
    });

    // 1. wait for it to connect first time
    connection.waitUntilSocketOpen().then(() => {
      // 3. wait for reconnection logic to triger
      connection['socket'].on('error', () => {
        // 4. wait for successful connection
        connection.waitUntilSocketOpen().then(() => {
          expect(connection['reconnectAttempts']).toEqual(1);
          connection.close();
          done();
        });
      });

      // 2. throw error and force it to reconnect
      connection['socket'].emit('error', new Error('test: force disconnect'));
    });
  });
  it('on error is emitted when ping is not received', (done) => {
    const connection = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      maxTimeWithoutPing: 1e3
    });

    connection['socket'].on('error', (error) => {
      connection.close();
      expect(error.message).toContain('heartbeat');
      done();
    });
  });
  it('on error is not emitted when ping is received', (done) => {
    const maxTimeWithoutPing = 100;

    server.on('connection', (ws) => {
      const pingInterval = setInterval(() => {
        ws.ping();
      }, maxTimeWithoutPing / 4);

      ws.on('close', () => {
        clearInterval(pingInterval);
      });
    });

    const reconnectDelay = 100000;
    const waitUntilSocketOpenSpy = jest.spyOn(
      WebsocketHelper.prototype,
      'waitUntilSocketOpen'
    );
    let helper: WebsocketHelper;

    helper = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      reconnectDelay,
      maxTimeWithoutPing
    });

    helper.waitUntilSocketOpen();

    // wait for 2 heartbeats
    setTimeout(() => {
      helper.close();
      expect(waitUntilSocketOpenSpy.mock.calls.length).toEqual(1);
      done();
    }, maxTimeWithoutPing * 2);
  });
  it('should throw on reconnect attempt', (done) => {
    server.close();
    httpServer.close();
    const connection = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      attemptToReconnect: false
    });

    connection.waitUntilSocketOpen().catch((error) => {
      connection.close();
      expect(String(error)).toContain(
        'WebSocket failed to connect: connect ECONNREFUSED 127.0.0.1:1234'
      );
      done();
    });
  });
  it('should throw when reaching all reconnect attempts', (done) => {
    server.close();
    httpServer.close();
    const connection = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      maxReconnectAttempts: 5
    });

    connection.waitUntilSocketOpen().catch((error) => {
      connection.close();
      expect(String(error)).toContain(
        'WebSocket failed to connect: connect ECONNREFUSED 127.0.0.1:1234'
      );
      expect(
        // @ts-ignore
        connection.reconnectAttempts
      ).toEqual(5);
      done();
    });
  });
  it('should trigger onMessage event', (done) => {
    let connection: WebsocketHelper;
    const onMessageSpy = jest.fn((_data: string) => {
      // on message listener works
      connection.close();
      done();
    });

    server.on('connection', (ws) => {
      ws.on('message', () => {
        ws.send(ENCODED_HOPRD_MESSAGE);
      });
    });

    connection = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      onMessage: onMessageSpy
    });
    connection.waitUntilSocketOpen().then((conn) => {
      conn.send('i am connected');
    });
  });
  it('should trigger onOpen event', (done) => {
    let connection: WebsocketHelper;
    const onOpenSpy = jest.fn(() => {
      // on open listener works
      connection.close();
      done();
    });

    connection = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      onOpen: onOpenSpy
    });
  });
  it('should trigger onClose event', (done) => {
    let connection: WebsocketHelper;
    const onCloseSpy = jest.fn(() => {
      // on close listener works
      done();
    });

    connection = new WebsocketHelper({
      apiEndpoint,
      apiToken,
      onClose: onCloseSpy
    });
    connection.waitUntilSocketOpen().then(() => {
      connection.close();
    });
  });
});
