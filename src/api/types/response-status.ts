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
 * Stato della response
 * @export
 * @interface ResponseStatus
 */
export interface ResponseStatus {
  /**
   * Return code. * 0 -> OK * 99 -> KO
   * @type {number}
   * @memberof ResponseStatus
   */
  code: ResponseStatusCodeEnum;
  /**
   *
   * @type {string}
   * @memberof ResponseStatus
   */
  message: string;
  /**
   * Tempo, espresso in ms comunicato  al chiamante, trascorso il quale è possibile effettuare un nuovo tentativo di avvio della transazione.
   * @type {number}
   * @memberof ResponseStatus
   */
  retryAfter?: number;
}

export const ResponseStatusCodeEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
  NUMBER_3: 3,
  NUMBER_99: 99,
} as const;

export type ResponseStatusCodeEnum =
  (typeof ResponseStatusCodeEnum)[keyof typeof ResponseStatusCodeEnum];
