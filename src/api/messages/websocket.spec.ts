import http from 'http';
import WS from 'isomorphic-ws';
import { websocket } from './websocket';

const PORT = 8888;

describe('websocket', function () {
  const API_ENDPOINT = `http://localhost:${PORT}`;
  const API_TOKEN = 'S3CR3T-T0K3N';
  let server: WS.Server;
  let httpServer: http.Server;

  beforeEach(function () {
    httpServer = http.createServer();
    server = new WS.Server({ server: httpServer });
    httpServer.listen(PORT);
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
});
