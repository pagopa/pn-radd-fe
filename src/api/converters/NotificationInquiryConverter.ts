import {
  OperationActResponse,
  OperationAorResponse,
  OperationsActDetailsResponse,
  OperationsAorDetailsResponse,
  OperationsResponse,
} from '../types';
import { OperationsDetailsResponse } from '../types/operations-details-response';

export const NotificationInquiryConverter = {
  operationsActDetailsToOperationsResponse: (response: OperationsActDetailsResponse) => {
    const converted: OperationsResponse = {};
    converted.status = response.status;
    converted.result = response.result;
    if (response.elements) {
      converted.operations = response.elements.map<OperationsDetailsResponse>((item) => ({
        ...item,
        iuns: [item.iun!],
      }));
    } else {
      converted.operations = [];
    }
    return converted;
  },
  operationsAorDetailsToOperationsResponse: (response: OperationsAorDetailsResponse) => {
    const converted: OperationsResponse = {};
    converted.status = response.status;
    converted.result = response.result;
    converted.operations = response.elements;
    return converted;
  },
  operationActResponseToOperationsResponse: (response: OperationActResponse) => {
    const converted: OperationsResponse = {};
    converted.status = response.status;
    converted.result = response.result;
    if (response.element) {
      const convertedOperation: OperationsDetailsResponse = {
        ...response.element,
        iuns: [response.element.iun!],
      };
      converted.operations = [convertedOperation];
    } else {
      converted.operations = [];
    }
    return converted;
  },
  operationAorResponseToOperationsResponse: (response: OperationAorResponse) => {
    const converted: OperationsResponse = {};
    converted.status = response.status;
    converted.result = response.result;
    if (response.element) {
      const convertedOperation: OperationsDetailsResponse = {
        ...response.element,
      };
      converted.operations = [convertedOperation];
    } else {
      converted.operations = [];
    }
    return converted;
  },
};
