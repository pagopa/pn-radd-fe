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


// May contain unused imports in some cases
// @ts-ignore
import { OperationResponseStatus } from './operation-response-status';
// May contain unused imports in some cases
// @ts-ignore
import { OperationsDetailsResponse } from './operations-details-response';

/**
 * Pratiche recuperate
 * @export
 * @interface OperationsResponse
 */
export interface OperationsResponse {
    /**
     * 
     * @type {Array<OperationsDetailsResponse>}
     * @memberof OperationsResponse
     */
    'operations'?: Array<OperationsDetailsResponse>;
    /**
     * 
     * @type {boolean}
     * @memberof OperationsResponse
     */
    'result'?: boolean;
    /**
     * 
     * @type {OperationResponseStatus}
     * @memberof OperationsResponse
     */
    'status'?: OperationResponseStatus;
}

