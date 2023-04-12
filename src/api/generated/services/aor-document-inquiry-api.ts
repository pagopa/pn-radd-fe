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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { AORInquiryResponse } from '../types';
/**
 * AorDocumentInquiryApi - axios parameter creator
 * @export
 */
export const AorDocumentInquiryApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * API utilizzata per la verifica della presenza a sistema di avvisi di avvenuta ricezione per il cliente.
         * @param {string} uid Identificativo del client giustapposizione dei campi frazionario-pdl-timestamp
         * @param {string} recipientTaxId Codice Fiscale Destinatario
         * @param {'PF' | 'PG'} recipientType Sigla, Persona fisica o giuridica
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aorInquiry: async (uid: string, recipientTaxId: string, recipientType: 'PF' | 'PG', options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'uid' is not null or undefined
            assertParamExists('aorInquiry', 'uid', uid)
            // verify required parameter 'recipientTaxId' is not null or undefined
            assertParamExists('aorInquiry', 'recipientTaxId', recipientTaxId)
            // verify required parameter 'recipientType' is not null or undefined
            assertParamExists('aorInquiry', 'recipientType', recipientType)
            const localVarPath = `/radd-private/api/v1/aor/inquiry`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication APIKeyAuth required
            await setApiKeyToObject(localVarHeaderParameter, "x-api-key", configuration)

            if (recipientTaxId !== undefined) {
                localVarQueryParameter['recipientTaxId'] = recipientTaxId;
            }

            if (recipientType !== undefined) {
                localVarQueryParameter['recipientType'] = recipientType;
            }

            if (uid != null) {
                localVarHeaderParameter['uid'] = String(uid);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AorDocumentInquiryApi - functional programming interface
 * @export
 */
export const AorDocumentInquiryApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AorDocumentInquiryApiAxiosParamCreator(configuration)
    return {
        /**
         * API utilizzata per la verifica della presenza a sistema di avvisi di avvenuta ricezione per il cliente.
         * @param {string} uid Identificativo del client giustapposizione dei campi frazionario-pdl-timestamp
         * @param {string} recipientTaxId Codice Fiscale Destinatario
         * @param {'PF' | 'PG'} recipientType Sigla, Persona fisica o giuridica
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async aorInquiry(uid: string, recipientTaxId: string, recipientType: 'PF' | 'PG', options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AORInquiryResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.aorInquiry(uid, recipientTaxId, recipientType, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AorDocumentInquiryApi - factory interface
 * @export
 */
export const AorDocumentInquiryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AorDocumentInquiryApiFp(configuration)
    return {
        /**
         * API utilizzata per la verifica della presenza a sistema di avvisi di avvenuta ricezione per il cliente.
         * @param {string} uid Identificativo del client giustapposizione dei campi frazionario-pdl-timestamp
         * @param {string} recipientTaxId Codice Fiscale Destinatario
         * @param {'PF' | 'PG'} recipientType Sigla, Persona fisica o giuridica
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        aorInquiry(uid: string, recipientTaxId: string, recipientType: 'PF' | 'PG', options?: any): AxiosPromise<AORInquiryResponse> {
            return localVarFp.aorInquiry(uid, recipientTaxId, recipientType, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AorDocumentInquiryApi - object-oriented interface
 * @export
 * @class AorDocumentInquiryApi
 * @extends {BaseAPI}
 */
export class AorDocumentInquiryApi extends BaseAPI {
    /**
     * API utilizzata per la verifica della presenza a sistema di avvisi di avvenuta ricezione per il cliente.
     * @param {string} uid Identificativo del client giustapposizione dei campi frazionario-pdl-timestamp
     * @param {string} recipientTaxId Codice Fiscale Destinatario
     * @param {'PF' | 'PG'} recipientType Sigla, Persona fisica o giuridica
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AorDocumentInquiryApi
     */
    public aorInquiry(uid: string, recipientTaxId: string, recipientType: 'PF' | 'PG', options?: AxiosRequestConfig) {
        return AorDocumentInquiryApiFp(this.configuration).aorInquiry(uid, recipientTaxId, recipientType, options).then((request) => request(this.axios, this.basePath));
    }
}
