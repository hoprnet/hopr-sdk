import fetch from "cross-fetch";
import { APIError } from "./error";
const fetchWithTimeout = (url, options, ms = 3e4) => {
  const controller = new AbortController();
  const promise = fetch(url, { ...options, signal: controller.signal }).catch(
    () => {
      throw new APIError({
        error: "TIMEOUT",
        status: "504"
      });
    }
  );
  const timeout = setTimeout(() => controller.abort(), ms);
  return promise.finally(() => clearTimeout(timeout));
};
export {
  fetchWithTimeout
};
