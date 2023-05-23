import { Headers } from "cross-fetch";
const getHeaders = (apiKey) => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept-Content", "application/json");
  headers.set("x-auth-token", apiKey);
  return headers;
};
export {
  getHeaders
};