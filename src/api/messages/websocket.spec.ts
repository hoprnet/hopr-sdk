import http from 'http';
import WS from 'isomorphic-ws';
import { websocket, getWsUrl } from './websocket';

describe('websocket', function () {
  const API_ENDPOINT = 'http://localhost:1234';
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
    let connection = websocket({
      apiToken: API_TOKEN,
      apiEndpoint: API_ENDPOINT
    });

    connection.onopen = () => {
      connection.close();
      done();
    };
  });

  it('builds the apiEndpoint to create the websocket', function () {
    expect(
      getWsUrl({apiEndpoint: API_ENDPOINT, path: '/api/v2/messages/websocket/', apiToken: API_TOKEN})
    ).toBe(
      'ws://localhost:1234/api/v2/messages/websocket/?apiToken=S3CR3T-T0K3N'
    );
  });
});
