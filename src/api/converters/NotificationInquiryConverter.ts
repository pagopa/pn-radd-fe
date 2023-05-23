import { OperationActResponse, OperationAorResponse, OperationsActDetailsResponse, OperationsAorDetailsResponse, OperationsResponse } from "../types";

export const NotificationInquiryConverter = {
    operationsActDetailsToOperationsResponse: (response: OperationsActDetailsResponse) => {
        const converted : OperationsResponse = {};
        converted.status = response.status;
        converted.result = response.result;
        converted.operations = response.elements;
        return converted;
    },
    operationsAorDetailsToOperationsResponse: (response: OperationsAorDetailsResponse) => {
        const converted : OperationsResponse = {};
        converted.status = response.status;
        converted.result = response.result;
        converted.operations = response.elements;
        return converted;
    },
    operationActResponseToOperationsResponse: (response: OperationActResponse) => { 
        const converted : OperationsResponse = {};
        converted.status = response.status;
        converted.result = response.result;
        converted.operations = response.element ? [response.element] : [];
        return converted;
    },
    operationAorResponseToOperationsResponse: (response: OperationAorResponse) => { 
        const converted : OperationsResponse = {};
        converted.status = response.status;
        converted.result = response.result;
        converted.operations = response.element ? [response.element] : [];
        return converted;
    },
};