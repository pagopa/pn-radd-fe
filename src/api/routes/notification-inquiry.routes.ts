export const PRACTICES_BY_IUN_PATH = `/radd-web/:domain/operations/by-iun/:iun`;
export const GET_PRACTICES_BY_IUN_PATH = (domain: string, iun: string) => PRACTICES_BY_IUN_PATH.replace(":domain", domain).replace(":iun", iun);

export const TRANSACTION_BY_OPERATION_ID_PATH = `/radd-web/:domain/operations/by-id/:operationId`;
export const GET_TRANSACTION_BY_OPERATION_ID_PATH = (operationId: string, domain: string) =>  TRANSACTION_BY_OPERATION_ID_PATH.replace(":domain", domain).replace(":operationId", operationId);

export const PRACTICES_BY_INTERNAL_ID_PATH = `/radd-web/:domain/operations/by-internalId/:internalId`;
export const GET_PRACTICES_BY_INTERNAL_ID_PATH = (internalId: string, domain: string) => PRACTICES_BY_INTERNAL_ID_PATH.replace(":domain", domain).replace(":internalId", internalId);
