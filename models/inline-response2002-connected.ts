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
import { HoprAddress } from './hopr-address';
import { InlineResponse2002Heartbeats } from './inline-response2002-heartbeats';
import { MultiAddress } from './multi-address';
/**
 * 
 * @export
 * @interface InlineResponse2002Connected
 */
export interface InlineResponse2002Connected {
    /**
     * 
     * @type {HoprAddress}
     * @memberof InlineResponse2002Connected
     */
    peerId?: HoprAddress;
    /**
     * 
     * @type {MultiAddress}
     * @memberof InlineResponse2002Connected
     */
    multiAddr?: MultiAddress;
    /**
     * 
     * @type {InlineResponse2002Heartbeats}
     * @memberof InlineResponse2002Connected
     */
    heartbeats?: InlineResponse2002Heartbeats;
    /**
     * Timestamp on when the node was last seen (in milliseconds)
     * @type {number}
     * @memberof InlineResponse2002Connected
     */
    lastSeen?: number;
    /**
     * A float between 0 (completely unreliable) and 1 (completely reliable) estimating the quality of service of a peer's network connection
     * @type {number}
     * @memberof InlineResponse2002Connected
     */
    quality?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2002Connected
     */
    backoff?: number;
    /**
     * True if the node is new (no heartbeats sent yet).
     * @type {boolean}
     * @memberof InlineResponse2002Connected
     */
    isNew?: boolean;
    /**
     * HOPR protocol version as determined from the successful ping in the Major.Minor.Patch format or \"unknown\"
     * @type {string}
     * @memberof InlineResponse2002Connected
     */
    reportedVersion?: string;
}
