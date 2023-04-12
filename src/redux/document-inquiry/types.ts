import { DocumentUploadRequest, DocumentUploadResponse } from "../../api/generated";

export type DocumentInquiryForm = {
	recipientTaxId: string,
	recipientType: 'PG' | 'PF',
	delegateTaxId: string,
	qrCode?: string
}

export type DocumentInquiryFile = {
	checksum: string,
	fileKey: string
}

export type DocumentInquiryTransaction = {
	operationId: string,
	urlList: Array<string>
}

export type DocumentInquiryRequest = {
	formData: DocumentInquiryForm,
	fileData: DocumentInquiryFile,
	transactionData: DocumentInquiryTransaction
};

export enum DocumentInquiryType {
    AOR = "AOR",
    ACT = "ACT"
}