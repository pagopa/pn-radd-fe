import { DocumentInquiryType } from '../redux/document-inquiry/types';

export const getDomainByInquiryType = (inquiryType: DocumentInquiryType) =>
  inquiryType === DocumentInquiryType.ACT ? 'ACT' : 'AOR';
