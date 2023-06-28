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
/**
 * 
 * @export
 * @interface InlineResponse2002Heartbeats
 */
export interface InlineResponse2002Heartbeats {
    /**
     * Heartbeats sent to the node
     * @type {number}
     * @memberof InlineResponse2002Heartbeats
     */
    sent?: number;
    /**
     * Successful heartbeats sent to the node
     * @type {number}
     * @memberof InlineResponse2002Heartbeats
     */
    success?: number;
}
