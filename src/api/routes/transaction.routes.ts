export const START_TRANSACTION_PATH = `/radd-web/:domain/transaction/start`;
export const GET_START_TRANSACTION_PATH = (domain: string) =>
  START_TRANSACTION_PATH.replace(':domain', domain);

export const COMPLETE_TRANSACTION_PATH = `/radd-web/:domain/transaction/complete`;
export const GET_COMPLETE_TRANSACTION_PATH = (domain: string) =>
  COMPLETE_TRANSACTION_PATH.replace(':domain', domain);

export const ABORT_TRANSACTION_PATH = `/radd-web/:domain/transaction/abort`;
export const GET_ABORT_TRANSACTION_PATH = (domain: string) =>
  ABORT_TRANSACTION_PATH.replace(':domain', domain);
