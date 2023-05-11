import http from 'http';
import WS from 'isomorphic-ws';
import { websocket, getWsUrl } from './websocket';

describe('websocket', function () {
  const BASE_PATH = 'http://localhost:1234';
  const API_TOKEN = 'S3CR3T-T0K3N';
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
    let connection = websocket(BASE_PATH, API_TOKEN);

    connection.onopen = () => {
      connection.close();
      done();
    };
  });

  it('builds the url to create the websocket', function () {
    expect(getWsUrl(BASE_PATH, '/api/v2/messages/websocket/', API_TOKEN)).toBe(
      'ws://localhost:1234/api/v2/messages/websocket/?apiToken=S3CR3T-T0K3N'
    );
  });
});
