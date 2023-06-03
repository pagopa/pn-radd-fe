export const HOMEPAGE = `/`;
export const DOCUMENT_INQUIRY_ACT = `/richiesta/atti-opponibili-terzi`;
export const DOCUMENT_INQUIRY_AOR = `/richiesta/avvisi-avvenuta-ricezione`;
export const SEARCH_INQUIRY = `/storico-richieste`;
export const SEARCH_INQUIRY_RESULT = `${SEARCH_INQUIRY}/risultato`;
export const SEARCH_INQUIRY_DETAIL = `${SEARCH_INQUIRY_RESULT}/:operationId`;
export const GET_SEARCH_INQUIRY_DETAIL_PATH = (operationId: string) => `${SEARCH_INQUIRY_RESULT}/${operationId}`;