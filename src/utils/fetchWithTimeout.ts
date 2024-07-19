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
    throw err;
  });
};
