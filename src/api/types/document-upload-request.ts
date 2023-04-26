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
 * Richiesta di upload verso PagoPA
 * @export
 * @interface DocumentUploadRequest
 */
export interface DocumentUploadRequest {
  /**
   * Concatenazione di frazionario-pdl-progressivoPDL-timestamp
   * @type {string}
   * @memberof DocumentUploadRequest
   */
  bundleId?: string;
  /**
   *
   * @type {string}
   * @memberof DocumentUploadRequest
   */
  contentType: string;
  /**
   *
   * @type {string}
   * @memberof DocumentUploadRequest
   */
  checksum: string;
}
