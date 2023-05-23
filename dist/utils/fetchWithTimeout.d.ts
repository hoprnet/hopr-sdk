declare const fetchWithTimeout: (url: URL | RequestInfo, options: RequestInit | undefined, ms?: number) => Promise<Response>;

export { fetchWithTimeout };
