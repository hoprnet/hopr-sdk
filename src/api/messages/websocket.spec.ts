import http from 'http';
import WS from 'isomorphic-ws';
import { websocket, getWsUrl } from './websocket';

describe('websocket', function () {
  const API_URL = 'http://localhost:1234';
  const API_KEY = 'S3CR3T-T0K3N';
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
    let connection = websocket({
      apiKey: API_KEY,
      url: API_URL
    });

    connection.onopen = () => {
      connection.close();
      done();
    };
  });

  it('builds the url to create the websocket', function () {
    expect(getWsUrl(API_URL, '/api/v2/messages/websocket/', API_KEY)).toBe(
      'ws://localhost:1234/api/v2/messages/websocket/?apiToken=S3CR3T-T0K3N'
    );
  });
});
