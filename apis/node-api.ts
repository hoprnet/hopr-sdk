/* tslint:disable */
/* eslint-disable */
/**
 * HOPRd Rest API v2
 * This Rest API enables developers to interact with a hoprd node programatically.
 *
 * OpenAPI spec version: 2.0.0
 * Contact: tech@hoprnet.org
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { InlineResponse2001 } from '../models';
import { InlineResponse2002 } from '../models';
import { InlineResponse2003 } from '../models';
import { InlineResponse206 } from '../models';
import { InlineResponse422 } from '../models';
import { InlineResponseMap200 } from '../models';
import { NodePingBody } from '../models';
import { RequestStatus } from '../models';
/**
 * NodeApi - axios parameter creator
 * @export
 */
export const NodeApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * List all known entry nodes and their multiaddrs and their eligibility state
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        nodeGetEntryNodes: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/node/entryNodes`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication keyScheme required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-auth-token")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-auth-token"] = localVarApiKeyValue;
            }

            // authentication passwordScheme required
            // http basic authentication required
            if (configuration && (configuration.username || configuration.password)) {
                localVarRequestOptions["auth"] = { username: configuration.username, password: configuration.password };
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Information about the HOPR Node, including any options it started with. See the schema of the response to get more information on each field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        nodeGetInfo: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/node/info`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication keyScheme required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-auth-token")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-auth-token"] = localVarApiKeyValue;
            }

            // authentication passwordScheme required
            // http basic authentication required
            if (configuration && (configuration.username || configuration.password)) {
                localVarRequestOptions["auth"] = { username: configuration.username, password: configuration.password };
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Retrieve Prometheus metrics from the running node.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        nodeGetMetrics: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/node/metrics`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication keyScheme required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-auth-token")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-auth-token"] = localVarApiKeyValue;
            }

            // authentication passwordScheme required
            // http basic authentication required
            if (configuration && (configuration.username || configuration.password)) {
                localVarRequestOptions["auth"] = { username: configuration.username, password: configuration.password };
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Lists information for `connected peers` and `announced peers`. Connected peers are nodes which are connected to the node while announced peers are nodes which have announced to the network. Optionally, you can pass `quality` parameter which would filter out peers with lower quality to the one specified.
         * @param {number} [quality] When quality is passed, the response will only include peers with higher or equal quality to the one specified.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        nodeGetPeers: async (quality?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/node/peers`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication keyScheme required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-auth-token")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-auth-token"] = localVarApiKeyValue;
            }

            // authentication passwordScheme required
            // http basic authentication required
            if (configuration && (configuration.username || configuration.password)) {
                localVarRequestOptions["auth"] = { username: configuration.username, password: configuration.password };
            }

            if (quality !== undefined) {
                localVarQueryParameter['quality'] = quality;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get release version of the running node.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        nodeGetVersion: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/node/version`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication keyScheme required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-auth-token")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-auth-token"] = localVarApiKeyValue;
            }

            // authentication passwordScheme required
            // http basic authentication required
            if (configuration && (configuration.username || configuration.password)) {
                localVarRequestOptions["auth"] = { username: configuration.username, password: configuration.password };
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Pings another node to check its availability.
         * @param {NodePingBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        nodePing: async (body?: NodePingBody, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/node/ping`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication keyScheme required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-auth-token")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-auth-token"] = localVarApiKeyValue;
            }

            // authentication passwordScheme required
            // http basic authentication required
            if (configuration && (configuration.username || configuration.password)) {
                localVarRequestOptions["auth"] = { username: configuration.username, password: configuration.password };
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This is a websocket endpoint which streams legacy hopr-admin data. Authentication (if enabled) is done via either passing an `apiToken` parameter in the url or cookie `X-Auth-Token`. Connect to the endpoint by using a WS client. No preview available. Example: `ws://127.0.0.1:3001/api/v2/node/stream/websocket/?apiToken=myApiToken`
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        nodeStreamWebsocket: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/node/stream/websocket`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication keyScheme required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-auth-token")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-auth-token"] = localVarApiKeyValue;
            }

            // authentication passwordScheme required
            // http basic authentication required
            if (configuration && (configuration.username || configuration.password)) {
                localVarRequestOptions["auth"] = { username: configuration.username, password: configuration.password };
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * NodeApi - functional programming interface
 * @export
 */
export const NodeApiFp = function(configuration?: Configuration) {
    return {
        /**
         * List all known entry nodes and their multiaddrs and their eligibility state
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetEntryNodes(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<{ [key: string]: InlineResponseMap200; }>>> {
            const localVarAxiosArgs = await NodeApiAxiosParamCreator(configuration).nodeGetEntryNodes(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Information about the HOPR Node, including any options it started with. See the schema of the response to get more information on each field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetInfo(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse2003>>> {
            const localVarAxiosArgs = await NodeApiAxiosParamCreator(configuration).nodeGetInfo(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Retrieve Prometheus metrics from the running node.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetMetrics(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<string>>> {
            const localVarAxiosArgs = await NodeApiAxiosParamCreator(configuration).nodeGetMetrics(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Lists information for `connected peers` and `announced peers`. Connected peers are nodes which are connected to the node while announced peers are nodes which have announced to the network. Optionally, you can pass `quality` parameter which would filter out peers with lower quality to the one specified.
         * @param {number} [quality] When quality is passed, the response will only include peers with higher or equal quality to the one specified.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetPeers(quality?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse2002>>> {
            const localVarAxiosArgs = await NodeApiAxiosParamCreator(configuration).nodeGetPeers(quality, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get release version of the running node.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetVersion(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<string>>> {
            const localVarAxiosArgs = await NodeApiAxiosParamCreator(configuration).nodeGetVersion(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Pings another node to check its availability.
         * @param {NodePingBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodePing(body?: NodePingBody, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse2001>>> {
            const localVarAxiosArgs = await NodeApiAxiosParamCreator(configuration).nodePing(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This is a websocket endpoint which streams legacy hopr-admin data. Authentication (if enabled) is done via either passing an `apiToken` parameter in the url or cookie `X-Auth-Token`. Connect to the endpoint by using a WS client. No preview available. Example: `ws://127.0.0.1:3001/api/v2/node/stream/websocket/?apiToken=myApiToken`
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeStreamWebsocket(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<InlineResponse206>>> {
            const localVarAxiosArgs = await NodeApiAxiosParamCreator(configuration).nodeStreamWebsocket(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * NodeApi - factory interface
 * @export
 */
export const NodeApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * List all known entry nodes and their multiaddrs and their eligibility state
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetEntryNodes(options?: AxiosRequestConfig): Promise<AxiosResponse<{ [key: string]: InlineResponseMap200; }>> {
            return NodeApiFp(configuration).nodeGetEntryNodes(options).then((request) => request(axios, basePath));
        },
        /**
         * Information about the HOPR Node, including any options it started with. See the schema of the response to get more information on each field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetInfo(options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse2003>> {
            return NodeApiFp(configuration).nodeGetInfo(options).then((request) => request(axios, basePath));
        },
        /**
         * Retrieve Prometheus metrics from the running node.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetMetrics(options?: AxiosRequestConfig): Promise<AxiosResponse<string>> {
            return NodeApiFp(configuration).nodeGetMetrics(options).then((request) => request(axios, basePath));
        },
        /**
         * Lists information for `connected peers` and `announced peers`. Connected peers are nodes which are connected to the node while announced peers are nodes which have announced to the network. Optionally, you can pass `quality` parameter which would filter out peers with lower quality to the one specified.
         * @param {number} [quality] When quality is passed, the response will only include peers with higher or equal quality to the one specified.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetPeers(quality?: number, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse2002>> {
            return NodeApiFp(configuration).nodeGetPeers(quality, options).then((request) => request(axios, basePath));
        },
        /**
         * Get release version of the running node.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeGetVersion(options?: AxiosRequestConfig): Promise<AxiosResponse<string>> {
            return NodeApiFp(configuration).nodeGetVersion(options).then((request) => request(axios, basePath));
        },
        /**
         * Pings another node to check its availability.
         * @param {NodePingBody} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodePing(body?: NodePingBody, options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse2001>> {
            return NodeApiFp(configuration).nodePing(body, options).then((request) => request(axios, basePath));
        },
        /**
         * This is a websocket endpoint which streams legacy hopr-admin data. Authentication (if enabled) is done via either passing an `apiToken` parameter in the url or cookie `X-Auth-Token`. Connect to the endpoint by using a WS client. No preview available. Example: `ws://127.0.0.1:3001/api/v2/node/stream/websocket/?apiToken=myApiToken`
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async nodeStreamWebsocket(options?: AxiosRequestConfig): Promise<AxiosResponse<InlineResponse206>> {
            return NodeApiFp(configuration).nodeStreamWebsocket(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * NodeApi - object-oriented interface
 * @export
 * @class NodeApi
 * @extends {BaseAPI}
 */
export class NodeApi extends BaseAPI {
    /**
     * List all known entry nodes and their multiaddrs and their eligibility state
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NodeApi
     */
    public async nodeGetEntryNodes(options?: AxiosRequestConfig) : Promise<AxiosResponse<{ [key: string]: InlineResponseMap200; }>> {
        return NodeApiFp(this.configuration).nodeGetEntryNodes(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Information about the HOPR Node, including any options it started with. See the schema of the response to get more information on each field.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NodeApi
     */
    public async nodeGetInfo(options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse2003>> {
        return NodeApiFp(this.configuration).nodeGetInfo(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Retrieve Prometheus metrics from the running node.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NodeApi
     */
    public async nodeGetMetrics(options?: AxiosRequestConfig) : Promise<AxiosResponse<string>> {
        return NodeApiFp(this.configuration).nodeGetMetrics(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Lists information for `connected peers` and `announced peers`. Connected peers are nodes which are connected to the node while announced peers are nodes which have announced to the network. Optionally, you can pass `quality` parameter which would filter out peers with lower quality to the one specified.
     * @param {number} [quality] When quality is passed, the response will only include peers with higher or equal quality to the one specified.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NodeApi
     */
    public async nodeGetPeers(quality?: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse2002>> {
        return NodeApiFp(this.configuration).nodeGetPeers(quality, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Get release version of the running node.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NodeApi
     */
    public async nodeGetVersion(options?: AxiosRequestConfig) : Promise<AxiosResponse<string>> {
        return NodeApiFp(this.configuration).nodeGetVersion(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * Pings another node to check its availability.
     * @param {NodePingBody} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NodeApi
     */
    public async nodePing(body?: NodePingBody, options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse2001>> {
        return NodeApiFp(this.configuration).nodePing(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * This is a websocket endpoint which streams legacy hopr-admin data. Authentication (if enabled) is done via either passing an `apiToken` parameter in the url or cookie `X-Auth-Token`. Connect to the endpoint by using a WS client. No preview available. Example: `ws://127.0.0.1:3001/api/v2/node/stream/websocket/?apiToken=myApiToken`
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof NodeApi
     */
    public async nodeStreamWebsocket(options?: AxiosRequestConfig) : Promise<AxiosResponse<InlineResponse206>> {
        return NodeApiFp(this.configuration).nodeStreamWebsocket(options).then((request) => request(this.axios, this.basePath));
    }
}
