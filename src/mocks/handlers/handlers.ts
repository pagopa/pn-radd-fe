import { handler as authHandler } from './auth-handler';
import { handler as transactionHandler } from './transaction-handler';
import { handler as uploadHandler } from './upload-handler';
import { handler as actDocumentHandler } from './act-document-inquiry-handler';
import { handler as aorDocumentHandler } from './aor-document-inquiry-handler';

export const handlers = [
  ...authHandler,
  ...transactionHandler,
  ...uploadHandler,
  ...actDocumentHandler,
  ...aorDocumentHandler
];
