import { rest } from 'msw';
import { MOCK_API, API_BASE_URL } from '../../utils/const';
import data from '../data';
import { PRACTICES_BY_INTERNAL_ID_PATH, PRACTICES_BY_IUN_PATH, TRANSACTION_BY_OPERATION_ID_PATH } from '../../api';
import { OperationActResponse, OperationAorResponse, OperationsActDetailsResponse, OperationsResponse } from '../../api/types';

export const enabledHandler = [
    rest.get(`${API_BASE_URL}${PRACTICES_BY_IUN_PATH}`, (req, res, ctx) => {
        const { iun } = req.params;
        
        const MAP_IUN_TO_ERROR_RESPONSE : {[key:string]: OperationsResponse} = {
            "LXNR-QPMS-OGTW-202209-K-1": data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_KO,
            "BVMK-NSRI-HFOL-202209-N-1": data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_NOT_FOUND
        };
        const response = MAP_IUN_TO_ERROR_RESPONSE[iun as string] ?? data.NOTIFICATION_INQUIRY.INQUIRY_BY_IUN_OK;

        return res(ctx.delay(500), ctx.status(200), ctx.json(response));
    }),
    rest.get(`${API_BASE_URL}${TRANSACTION_BY_OPERATION_ID_PATH}`, (req, res, ctx) => {
        const { operationId, domain } = req.params;
        
        if(domain === 'act') {
            const MAP_OPERATION_ID_TO_ACT_ERROR_RESPONSE : {[key:string]: OperationActResponse} = {
                "67d8a1f225f24c13a05e00a0d8a8aaba": data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_OPERATION_ID_KO,
                "78c1f2769c8e4ba084a62e778a143d67": data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_OPERATION_ID_NOT_FOUND
            };

            const response = MAP_OPERATION_ID_TO_ACT_ERROR_RESPONSE[operationId as string] ?? data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_OPERATION_ID_OK;
            return res(ctx.delay(500), ctx.status(200), ctx.json(response));
        } else if(domain === 'aor') {
            const MAP_OPERATION_ID_TO_AOR_ERROR_RESPONSE : {[key:string]: OperationAorResponse} = {
                "67d8a1f225f24c13a05e00a0d8a8aaba": data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_OPERATION_ID_KO,
                "78c1f2769c8e4ba084a62e778a143d67": data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_OPERATION_ID_NOT_FOUND
            };

            const response = MAP_OPERATION_ID_TO_AOR_ERROR_RESPONSE[operationId as string] ?? data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_OPERATION_ID_OK;
            return res(ctx.delay(500), ctx.status(200), ctx.json(response));
        }
                
        return res(ctx.delay(500), ctx.status(400));
    }),
    rest.post(`${API_BASE_URL}${PRACTICES_BY_INTERNAL_ID_PATH}`, (req, res, ctx) => {
        const { internalId, domain } = req.params;
        
        if(domain === 'act') {
            const MAP_INTERNAL_ID_TO_ACT_ERROR_RESPONSE : {[key:string]: OperationsActDetailsResponse} = {
                "RFRGRZ66E21H751B": data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_INTERNAL_ID_KO,
                "GTAMRC01P30L736Y": data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_INTERNAL_ID_NOT_FOUND
            };

            const response = MAP_INTERNAL_ID_TO_ACT_ERROR_RESPONSE[internalId as string] ?? data.NOTIFICATION_INQUIRY.INQUIRY_ACT_BY_INTERNAL_ID_OK;
            return res(ctx.delay(500), ctx.status(200), ctx.json(response));
        } else if(domain === 'aor') {
            const MAP_INTERNAL_ID_TO_AOR_ERROR_RESPONSE : {[key:string]: OperationAorResponse} = {
                "RFRGRZ66E21H751B": data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_INTERNAL_ID_KO,
                "GTAMRC01P30L736Y": data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_INTERNAL_ID_NOT_FOUND
            };

            const response = MAP_INTERNAL_ID_TO_AOR_ERROR_RESPONSE[internalId as string] ?? data.NOTIFICATION_INQUIRY.INQUIRY_AOR_BY_INTERNAL_ID_OK;
            return res(ctx.delay(500), ctx.status(200), ctx.json(response));
        }
                
        return res(ctx.delay(500), ctx.status(400));
    }),
];

export const handler = MOCK_API ? enabledHandler : [];