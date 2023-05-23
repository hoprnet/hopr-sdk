import WebSocket from "isomorphic-ws";
const websocket = (payload) => {
  const endpointUrl = getWsUrl(
    payload.url,
    "/api/v2/messages/websocket/",
    payload.apiKey
  );
  return new WebSocket(endpointUrl);
};
const getWsUrl = (apiEndpoint, path, apiToken) => {
  const url = new URL(path, apiEndpoint);
  url.protocol = url.protocol === "https:" ? "wss" : "ws";
  url.search = `?apiToken=${apiToken}`;
  return url.toString();
};
export {
  getWsUrl,
  websocket
};
