/* tslint:disable */
/* eslint-disable */
/**
 * API Piattaforma Notifiche
 * # Interface definition for Piattaforma Notifiche ## changelog   * ### 0.1     * First draft   * ### 0.2     * Second draft   * ### 1.0     * First version
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

// May contain unused imports in some cases
// @ts-ignore
import { ResponseStatus } from './response-status';

/**
 * Response alla richiesta di chiusura della transazione
 * @export
 * @interface AbortTransactionResponse
 */
export interface AbortTransactionResponse {
  /**
   *
   * @type {ResponseStatus}
   * @memberof AbortTransactionResponse
   */
  status: ResponseStatus;
}
