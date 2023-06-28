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
import { TokenCapability } from './token-capability';
/**
 * 
 * @export
 * @interface Token
 */
export interface Token {
    /**
     * Unique ID of the token
     * @type {string}
     * @memberof Token
     */
    id: string;
    /**
     * Some description for the token
     * @type {string}
     * @memberof Token
     */
    description?: string;
    /**
     * Seconds since epoch until the token is valid
     * @type {number}
     * @memberof Token
     */
    validUntil?: number;
    /**
     * Array of capabilities associated with the token
     * @type {Array<TokenCapability>}
     * @memberof Token
     */
    capabilities: Array<TokenCapability>;
}
