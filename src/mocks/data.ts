import {
  AORInquiryResponse,
  AbortTransactionResponse,
  ActInquiryResponse,
  DocumentReadyResponse,
  DocumentUploadResponse,
  OperationActResponse,
  OperationAorResponse,
  OperationsActDetailsResponse,
  OperationsAorDetailsResponse,
  OperationsResponse,
  StartTransactionResponse,
} from '../api/types';
import { User } from '../redux/user/types';
import { API_BASE_URL } from '../utils/const';

const USER: User = {
  family_name: 'Colombo',
  fiscal_number: 'CLMCST42R12D969Z',
  name: 'Cristoforo',
  from_aa: false,
  uid: 'a6c1350d-1d69-4209-8bf8-31de58c79d6e',
  level: 'L2',
  iat: 1682079641,
  exp: Math.floor(Date.now() / 1000) + 60 * 30, // 30 minutes
  aud: 'portale.svil.pn.pagopa.it',
  iss: 'https://hub-login.spid.svil.pn.pagopa.it',
  jti: '_b4d10956e34cc4ffc812',
  email: 'c.colombo@pagopa.it',
  mobile_phone: '3222212210',
  sessionToken:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEzMWFhN2ZjLTQ3NjktNDA0ZS1hNzg4LWMzZmVlOTc3ZTJkOSJ9.eyJpYXQiOjE2ODIwNzk2NTEsImV4cCI6MTY4MjA4Mjg1MSwidWlkIjoiYTZjMTM1MGQtMWQ2OS00MjA5LThiZjgtMzFkZTU4Yzc5ZDZlIiwiaXNzIjoiaHR0cHM6Ly93ZWJhcGkuc3ZpbC5wbi5wYWdvcGEuaXQiLCJhdWQiOiJ3ZWJhcGkuc3ZpbC5wbi5wYWdvcGEuaXQiLCJqdGkiOiJfYjRkMTA5NTZlMzRjYzRmZmM4MTIifQ.W8MOgBMf5Q8HhpkrUscrkPTI6uAqgHCAROMFRj-MyQfYieUaq6RYRtaRxYG61AXRMvGRfTm4-1Tw6ltSNbgZaesQmWprpTdfv986b6GGioytng12XsKTpEn1ZpGiraYSDIev31HeaRPaGziVdqWHEzUKF6Uo4WwCQkfAzvgftj22UrP2mP9QU_1sjkRp-xxd3qiLUqDxXsIhDgVVltL3SMo1aaSyQD0KjAdLaSLE85gw1UA4vyCPEKf29AVU1W5Xp-sS1lCBAtpr7Vjr-XouBEhGNIiI8ZI8zRs6lzkwOUZeWtCMzt1W9PXNnxuYPvQiqkPkzKxNn2NyePtNVDmrSg',
};

type ActInquiryResponses = {
  ACT_INQUIRY_OK: ActInquiryResponse;
  ACT_INQUIRY_KO: ActInquiryResponse;
  ACT_INQUIRY_INVALID_DATA: ActInquiryResponse;
  ACT_INQUIRY_UNAVAILABLE_DOC: ActInquiryResponse;
  ACT_INQUIRY_ALREADY_PRINTED: ActInquiryResponse;
};

const ACT_INQUIRY_RESPONSES: ActInquiryResponses = {
  ACT_INQUIRY_OK: {
    result: true,
    status: {
      code: 0,
      message: 'OK',
    },
  },
  ACT_INQUIRY_KO: {
    result: false,
    status: {
      code: 99,
      message: 'KO',
    },
  },
  ACT_INQUIRY_INVALID_DATA: {
    result: false,
    status: {
      code: 1,
      message: 'QrCode/CF non valido/i',
    },
  },
  ACT_INQUIRY_UNAVAILABLE_DOC: {
    result: false,
    status: {
      code: 2,
      message: 'Documenti non più disponibili',
    },
  },
  ACT_INQUIRY_ALREADY_PRINTED: {
    result: false,
    status: {
      code: 3,
      message: 'Stampa già eseguita',
    },
  },
};

type AORInquiryResponses = {
  AOR_INQUIRY_OK: AORInquiryResponse;
  AOR_INQUIRY_KO: AORInquiryResponse;
};

const AOR_INQUIRY_RESPONSES: AORInquiryResponses = {
  AOR_INQUIRY_OK: {
    result: true,
    status: {
      code: 0,
      message: 'OK',
    },
  },
  AOR_INQUIRY_KO: {
    result: false,
    status: {
      code: 99,
      message: 'KO',
    },
  },
};

type UploadResponses = {
  UPLOAD_OK: DocumentUploadResponse;
  S3_OK: any;
  DOCUMENT_READY_OK: DocumentReadyResponse;
  DOCUMENT_READY_KO: DocumentReadyResponse;
};

const UPLOAD: UploadResponses = {
  UPLOAD_OK: {
    url: `${API_BASE_URL}/upload-s3` + '',
    secret: 'secret',
    fileKey: 'testFileKey',
    status: {
      code: 0,
      message: 'OK',
    },
  },
  S3_OK: {},
  DOCUMENT_READY_OK: {
    fileKey: 'test',
    ready: true,
  },
  DOCUMENT_READY_KO: {
    fileKey: 'test',
    ready: false,
  },
};

type TransactionResponses = {
  START_TRANSACTION_OK: StartTransactionResponse;
  START_TRANSACTION_OK_WITH_RETRY: (retryAfter: number) => StartTransactionResponse;
  COMPLETE_TRANSACTION_OK: StartTransactionResponse;
  ABORT_TRANSACTION_OK: AbortTransactionResponse;
};

const TRANSACTION: TransactionResponses = {
  START_TRANSACTION_OK: {
    urlList: [
      'http://web.pagopa.dev.it/notifiche/act/act1.pdf',
      'http://web.pagopa.dev.it/notifiche/act/act2.pdf',
      'http://web.pagopa.dev.it/notifiche/act/act3.pdf',
    ],
    status: {
      code: 0,
      message: '',
    },
  },
  START_TRANSACTION_OK_WITH_RETRY: (retryAfter: number = 5000) => ({
    urlList: [],
    status: {
      code: 2,
      message: 'Retry please.',
      retryAfter,
    },
  }),
  COMPLETE_TRANSACTION_OK: {
    status: {
      code: 0,
      message: '',
    },
  },
  ABORT_TRANSACTION_OK: {
    status: {
      code: 0,
      message: '',
    },
  },
};

type NotificationInquiryResponses = {
  INQUIRY_ACT_BY_OPERATION_ID_OK: OperationActResponse;
  INQUIRY_ACT_BY_OPERATION_ID_KO: OperationActResponse;
  INQUIRY_ACT_BY_OPERATION_ID_NOT_FOUND: OperationActResponse;

  INQUIRY_AOR_BY_OPERATION_ID_OK: OperationAorResponse;
  INQUIRY_AOR_BY_OPERATION_ID_KO: OperationAorResponse;
  INQUIRY_AOR_BY_OPERATION_ID_NOT_FOUND: OperationAorResponse;

  INQUIRY_ACT_BY_INTERNAL_ID_OK: OperationsActDetailsResponse;
  INQUIRY_ACT_BY_INTERNAL_ID_KO: OperationsActDetailsResponse;
  INQUIRY_ACT_BY_INTERNAL_ID_NOT_FOUND: OperationsActDetailsResponse;

  INQUIRY_AOR_BY_INTERNAL_ID_OK: OperationsAorDetailsResponse;
  INQUIRY_AOR_BY_INTERNAL_ID_KO: OperationsAorDetailsResponse;
  INQUIRY_AOR_BY_INTERNAL_ID_NOT_FOUND: OperationsAorDetailsResponse;

  INQUIRY_BY_IUN_OK: OperationsResponse;
  INQUIRY_BY_IUN_KO: OperationsResponse;
  INQUIRY_BY_IUN_NOT_FOUND: OperationsResponse;
};

const NOTIFICATION_INQUIRY: NotificationInquiryResponses = {
  INQUIRY_ACT_BY_INTERNAL_ID_OK: {
    elements: [
      {
        operationStatus: 'COMPLETED',
        operationType: 'ACT',
        iun: 'LJLH-GNTJ-DVXR-202209-J-1',
        operationId: 'asd1234',
        fileKey: 'FL-23-KKL',
        qrCode: 'FBD',
        recipientTaxId: 'TNTGTR76E21H751S',
        recipientType: 'PF',
        delegateTaxId: 'RFRGRZ66E21H751B',
        uid: 'uddHHHw123mk',
        operationStartDate: '2017-07-21T17:32:28Z',
        operationEndDate: '2017-07-21T18:00:28Z',
        errorReason: 'Error',
      },
    ],
    result: true,
    status: {
      code: 0,
      message: 'OK',
    },
  },
  INQUIRY_AOR_BY_INTERNAL_ID_OK: {
    elements: [
      {
        operationStatus: 'COMPLETED',
        operationType: 'AOR',
        iuns: ['LJLH-GNTJ-DVXR-202209-J-1'],
        operationId: 'asd1234',
        fileKey: 'FL-23-KKL',
        qrCode: 'FBD',
        recipientTaxId: 'TNTGTR76E21H751S',
        recipientType: 'PF',
        delegateTaxId: 'RFRGRZ66E21H751B',
        uid: 'uddHHHw123mk',
        operationStartDate: '2017-07-21T17:32:28Z',
        operationEndDate: '2017-07-21T18:00:28Z',
        errorReason: 'Error',
      },
    ],
    result: true,
    status: {
      code: 0,
      message: 'OK',
    },
  },
  INQUIRY_ACT_BY_OPERATION_ID_OK: {
    element: {
      operationStatus: 'COMPLETED',
      operationType: 'AOR',
      iun: 'LJLH-GNTJ-DVXR-202209-J-1',
      operationId: 'asd1234',
      fileKey: 'FL-23-KKL',
      qrCode: 'FBD',
      recipientTaxId: 'TNTGTR76E21H751S',
      recipientType: 'PF',
      delegateTaxId: 'RFRGRZ66E21H751B',
      uid: 'uddHHHw123mk',
      operationStartDate: '2017-07-21T17:32:28Z',
      operationEndDate: '2017-07-21T18:00:28Z',
      errorReason: 'Error',
    },
    result: true,
    status: {
      code: 0,
      message: 'OK',
    },
  },
  INQUIRY_AOR_BY_OPERATION_ID_OK: {
    element: {
      operationStatus: 'COMPLETED',
      operationType: 'AOR',
      iuns: ['LJLH-GNTJ-DVXR-202209-J-1'],
      operationId: 'asd1234',
      fileKey: 'FL-23-KKL',
      qrCode: 'FBD',
      recipientTaxId: 'TNTGTR76E21H751S',
      recipientType: 'PF',
      delegateTaxId: 'RFRGRZ66E21H751B',
      uid: 'uddHHHw123mk',
      operationStartDate: '2017-07-21T17:32:28Z',
      operationEndDate: '2017-07-21T18:00:28Z',
      errorReason: 'Error',
    },
    result: true,
    status: {
      code: 0,
      message: 'OK',
    },
  },
  INQUIRY_BY_IUN_OK: {
    operations: [
      {
        operationStatus: 'COMPLETED',
        operationType: 'ACT',
        iuns: ['LJLH-GNTJ-DVXR-202209-J-1'],
        operationId: 'asd1234',
        fileKey: 'FL-23-KKL',
        qrCode: 'FBD',
        recipientTaxId: 'TNTGTR76E21H751S',
        recipientType: 'PF',
        delegateTaxId: 'RFRGRZ66E21H751B',
        uid: 'uddHHHw123mk',
        operationStartDate: '2017-07-21T17:32:28Z',
        operationEndDate: '2017-07-21T18:00:28Z',
        errorReason: 'Error',
      },
    ],
    result: true,
    status: {
      code: 0,
      message: 'OK',
    },
  },
  INQUIRY_ACT_BY_INTERNAL_ID_KO: {
    elements: [],
    result: false,
    status: {
      code: 99,
      message: 'KO',
    },
  },
  INQUIRY_AOR_BY_INTERNAL_ID_KO: {
    elements: [],
    result: false,
    status: {
      code: 99,
      message: 'KO',
    },
  },
  INQUIRY_ACT_BY_OPERATION_ID_KO: {
    element: {},
    result: false,
    status: {
      code: 99,
      message: 'KO',
    },
  },
  INQUIRY_AOR_BY_OPERATION_ID_KO: {
    element: {},
    result: false,
    status: {
      code: 99,
      message: 'KO',
    },
  },
  INQUIRY_BY_IUN_KO: {
    operations: [],
    result: false,
    status: {
      code: 99,
      message: 'KO',
    },
  },
  INQUIRY_ACT_BY_INTERNAL_ID_NOT_FOUND: {
    elements: [],
    result: false,
    status: {
      code: 1,
      message: 'Nessun elemento associato',
    },
  },
  INQUIRY_AOR_BY_INTERNAL_ID_NOT_FOUND: {
    elements: [],
    result: false,
    status: {
      code: 1,
      message: 'Nessun elemento associato',
    },
  },
  INQUIRY_ACT_BY_OPERATION_ID_NOT_FOUND: {
    element: {},
    result: false,
    status: {
      code: 1,
      message: 'Nessun elemento associato',
    },
  },
  INQUIRY_AOR_BY_OPERATION_ID_NOT_FOUND: {
    element: {},
    result: false,
    status: {
      code: 1,
      message: 'Nessun elemento associato',
    },
  },
  INQUIRY_BY_IUN_NOT_FOUND: {
    operations: [],
    result: false,
    status: {
      code: 1,
      message: 'Nessun elemento associato',
    },
  },
};

export default {
  ACT_INQUIRY_RESPONSES,
  AOR_INQUIRY_RESPONSES,
  USER,
  TRANSACTION,
  UPLOAD,
  NOTIFICATION_INQUIRY,
};
