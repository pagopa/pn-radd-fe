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

/**
 * Richiesta  di chiusura della transazione
 * @export
 * @interface CompleteTransactionRequest
 */
export interface CompleteTransactionRequest {
  /**
   *
   * @type {string}
   * @memberof CompleteTransactionRequest
   */
  operationId: string;
  /**
   * Data/ora di completamento della transazione,  espressa in formato RFC3339.
   * @type {string}
   * @memberof CompleteTransactionRequest
   */
  operationDate: string;
}
