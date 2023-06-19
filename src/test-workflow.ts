import { DEV } from './utils/const';

type WorkflowInfo = {
  [key in AttributeName]?: string;
};

type AttributeName = 'taxId' | 'checksum' | 'operationId';

const checksumOK = '708F4C8216F30FA6007F8E2F316ECC935D94057202FC5D8008BCCC118EA12560';

const WORKFLOW_OK: WorkflowInfo = {
  taxId: 'GNIGNI80A01H501R',
  checksum: checksumOK,
  operationId: '9795ea34-e4e9-11ed-b5ea-0242ac120002',
};

const WORKFLOW_START_TRANSACTION_KO: WorkflowInfo = {
  taxId: 'PLOMRC01P30L736Y',
  checksum: checksumOK,
};

const WORKFLOW_START_TRANSACTION_NOT_READY: WorkflowInfo = {
  taxId: 'TSTGNN80A01F839X',
  checksum: checksumOK,
};

const WORKFLOW_START_TRANSACTION_500: WorkflowInfo = {
  taxId: 'VIAVIA90A01H501X',
  checksum: checksumOK,
};

const WORKFLOW_COMPLETE_TRANSACTION_KO: WorkflowInfo = {
  taxId: 'VTOMRC01P30L736Y',
  checksum: checksumOK,
  operationId: '4d4c70e7-8a69-4a60-b2e2-0a36b8d17bc5',
};

const WORKFLOW_COMPLETE_TRANSACTION_NOT_EXISTS: WorkflowInfo = {
  taxId: 'LBOMRC01P30L736Y',
  checksum: checksumOK,
  operationId: '9da7a31a-c29c-4760-91b8-7d2f59d27734',
};

const WORKFLOW_COMPLETE_TRANSACTION_ALREADY_COMPLETED: WorkflowInfo = {
  taxId: 'AEDMRC01P30L736Y',
  checksum: checksumOK,
  operationId: '6ee9f7d9-6b3e-431a-a39f-70f098b66002',
};

const WORKFLOW_COMPLETE_TRANSACTION_500: WorkflowInfo = {
  taxId: 'MADMRC01P30L736Y',
  checksum: checksumOK,
  operationId: '70d5f0c2-0c5c-4745-b5a5-5b0fb15d694d',
};

const WORKFLOW_ABORT_TRANSACTION: WorkflowInfo = {
  taxId: 'ZZAMRC01P30L736Y',
  checksum: checksumOK,
  operationId: '8ed10708-e511-11ed-b5ea-0242ac120002',
};

const WORKFLOWS = [
  WORKFLOW_OK,
  WORKFLOW_START_TRANSACTION_KO,
  WORKFLOW_START_TRANSACTION_NOT_READY,
  WORKFLOW_START_TRANSACTION_500,
  WORKFLOW_COMPLETE_TRANSACTION_KO,
  WORKFLOW_COMPLETE_TRANSACTION_NOT_EXISTS,
  WORKFLOW_COMPLETE_TRANSACTION_ALREADY_COMPLETED,
  WORKFLOW_COMPLETE_TRANSACTION_500,
  WORKFLOW_ABORT_TRANSACTION,
];

export const getWorkflowInfo = (
  taxId: string,
  attributeName: AttributeName,
  defaultValue: string
): string => {
  const workflow = WORKFLOWS.find((w) => w.taxId === taxId);
  if (!workflow || !DEV) {
    return defaultValue;
  }
  return workflow[attributeName] ?? defaultValue;
};
