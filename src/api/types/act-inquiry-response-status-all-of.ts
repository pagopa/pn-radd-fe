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
 * @interface ActInquiryResponseStatusAllOf
 */
export interface ActInquiryResponseStatusAllOf {
  /**
   * Return code. * 0 -> OK * 1 -> QrCode/CF non valido/i * 2 -> Documenti non più disponibili * 3 -> Stampa già eseguita * 99 -> KO
   * @type {number}
   * @memberof ActInquiryResponseStatusAllOf
   */
  code?: ActInquiryResponseStatusAllOfCodeEnum;
}

export const ActInquiryResponseStatusAllOfCodeEnum = {
  NUMBER_0: 0,
  NUMBER_1: 1,
  NUMBER_2: 2,
  NUMBER_3: 3,
  NUMBER_99: 99,
} as const;

export type ActInquiryResponseStatusAllOfCodeEnum =
  (typeof ActInquiryResponseStatusAllOfCodeEnum)[keyof typeof ActInquiryResponseStatusAllOfCodeEnum];
