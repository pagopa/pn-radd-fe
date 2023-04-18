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
 *
 * @export
 * @interface TransactionResponseStatusAllOf
 */
export interface TransactionResponseStatusAllOf {
  /**
   * Return code. * 0 -> OK (Anche in caso di  chiamata successiva con identici parametri) * 1 -> Transazione inesistente * 2 -> Transazione già completata (Messaggio di errore differente se già completata per chiamata a complete piuttosto che abort) * 99 -> KO
   * @type {number}
   * @memberof TransactionResponseStatusAllOf
   */
  code?: TransactionResponseStatusAllOfCodeEnum;
}

export const TransactionResponseStatusAllOfCodeEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
  NUMBER_99: 99,
} as const;

export type TransactionResponseStatusAllOfCodeEnum =
  (typeof TransactionResponseStatusAllOfCodeEnum)[keyof typeof TransactionResponseStatusAllOfCodeEnum];
