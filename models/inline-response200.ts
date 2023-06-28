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
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     * Number of tickets that other node in the channel earned and didn't redeem yet.
     * @type {number}
     * @memberof InlineResponse200
     */
    pending?: number;
    /**
     * Number of tickets that wait to be redeemed as for Hopr tokens.
     * @type {number}
     * @memberof InlineResponse200
     */
    unredeemed?: number;
    /**
     * Total value of all unredeemed tickets in Hopr tokens.
     * @type {string}
     * @memberof InlineResponse200
     */
    unredeemedValue?: string;
    /**
     * Number of tickets already redeemed on this node.
     * @type {number}
     * @memberof InlineResponse200
     */
    redeemed?: number;
    /**
     * Total value of all redeemed tickets in Hopr tokens.
     * @type {string}
     * @memberof InlineResponse200
     */
    redeemedValue?: string;
    /**
     * Number of tickets that didn't win any Hopr tokens. To better understand how tickets work read about probabilistic payments (https://docs.hoprnet.org/core/probabilistic-payments)
     * @type {number}
     * @memberof InlineResponse200
     */
    losingTickets?: number;
    /**
     * Proportion of number of winning tickets vs loosing tickets, 1 means 100% of tickets won and 0 means that all tickets were losing ones.
     * @type {number}
     * @memberof InlineResponse200
     */
    winProportion?: number;
    /**
     * Number of tickets that were not redeemed in time before channel was closed. Those cannot be redeemed anymore.
     * @type {number}
     * @memberof InlineResponse200
     */
    neglected?: number;
    /**
     * Number of tickets that were rejected by the network by not passing validation. In other words tickets that look suspicious and are not eligible for redeeming.
     * @type {number}
     * @memberof InlineResponse200
     */
    rejected?: number;
    /**
     * Total value of rejected tickets in Hopr tokens
     * @type {string}
     * @memberof InlineResponse200
     */
    rejectedValue?: string;
}
