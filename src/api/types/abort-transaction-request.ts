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
 * Richiesta  di cancellazione della transazione
 * @export
 * @interface AbortTransactionRequest
 */
export interface AbortTransactionRequest {
  /**
   *
   * @type {string}
   * @memberof AbortTransactionRequest
   */
  operationId: string;
  /**
   *
   * @type {string}
   * @memberof AbortTransactionRequest
   */
  reason?: string;
  /**
   * Data/ora di annullamento della transazione,  espressa in formato RFC3339.
   * @type {string}
   * @memberof AbortTransactionRequest
   */
  operationDate: string;
}
