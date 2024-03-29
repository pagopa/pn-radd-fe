/* tslint:disable */
/* eslint-disable */
/**
 * Piattaforma Notifiche: API del BFF dei servizi RADD
 * API utilizzate dal Backend for Frontend dei servizi RADD.
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Dettagli della response Act
 * @export
 * @interface OperationAorDetailResponse
 */
export interface OperationAorDetailResponse {
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  operationStatus?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  operationType?: string;
  /**
   *
   * @type {Array<string>}
   * @memberof OperationAorDetailResponse
   */
  iuns?: Array<string>;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  operationId?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  fileKey?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  qrCode?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  recipientTaxId?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  recipientType?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  delegateTaxId?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  uid?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  operationStartDate?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  operationEndDate?: string;
  /**
   *
   * @type {string}
   * @memberof OperationAorDetailResponse
   */
  errorReason?: string;
}
