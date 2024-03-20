export const fetchWithTimeout = (
  apiEndpoint: URL | RequestInfo,
  options?: RequestInit,
  ms: number = 30000
) => {
  return fetch(apiEndpoint, {
    ...options,
    signal: AbortSignal.timeout(ms)
  }).catch((err) => {
    if (err.name === 'TimeoutError') {
      // Request was aborted due to the controller signal
      throw new Error('TIMEOUT');
    }
    if (err.name === 'TypeError') {
      // AbortSignal not supported - only needed for nock
      return fallback(apiEndpoint, options, ms);
    }
    throw err;
  });
};

function fallback(
  apiEndpoint: URL | RequestInfo,
  options?: RequestInit,
  ms: number = 30000
) {
  const controller = new AbortController();
  const promise = fetch(apiEndpoint, {
    ...options,
    signal: controller.signal
  }).catch((err) => {
    if (err instanceof Error && err.name === 'AbortError') {
      // Request was aborted due to the controller signal
      throw new Error('TIMEOUT');
    }
    throw err;
  });
  // abort promise if it has not been completed after ms
  const timeout = setTimeout(() => controller.abort(), ms);

  return promise.finally(() => clearTimeout(timeout));
}
