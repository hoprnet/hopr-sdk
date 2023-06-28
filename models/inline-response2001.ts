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
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
    /**
     * Number of milliseconds it took to get the response from the pinged node.
     * @type {number}
     * @memberof InlineResponse2001
     */
    latency?: number;
    /**
     * HOPR protocol version as determined from the successful ping in the Major.Minor.Patch format or \"unknown\"
     * @type {string}
     * @memberof InlineResponse2001
     */
    reportedVersion?: string;
}
