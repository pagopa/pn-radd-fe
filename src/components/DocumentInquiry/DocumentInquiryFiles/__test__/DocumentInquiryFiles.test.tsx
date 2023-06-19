import { DocumentInquiryType } from '../../../../redux/document-inquiry/types';
import { RenderResult, fireEvent, render, waitFor } from '../../../../test-utils';
import { createMockedFile } from '../../../FileUpload/__test__/test-util';
import DocumentInquiryFiles from '../DocumentInquiryFiles';
import {
  InquiryFile,
  WaitingPhasePayload,
  UploadFilePayload,
} from '../reducer/inquiryFilesReducer';

let mockedFile = createMockedFile('mock.txt', 'plain/txt');
jest.mock('../InquiryFilesUpload', () => {
  const InquiryFilesUpload = ({
    files,
    isDelegatePresent,
    onNext,
    onUpload,
    onRemove,
  }: {
    files: InquiryFile;
    isDelegatePresent: boolean;
    onNext: (payload: WaitingPhasePayload) => void;
    onUpload: (payload: UploadFilePayload) => void;
    onRemove: (payload: DocumentType) => void;
  }) => {
    const handleClickOnUpload = () => {
      onUpload({ file: mockedFile, type: 'recipient-id' });
    };
    const handleClickOnRemove = () => {
      onRemove('recipient-id' as unknown as DocumentType);
    };
    const handleClickOnNext = () => {
      onNext({ bundleId: 'test', checksum: 'test', zip: mockedFile });
    };
    return (
      <>
        <p>InquiryFilesUpload</p>
        <button onClick={handleClickOnUpload}>Upload</button>
        <button onClick={handleClickOnRemove}>Remove</button>
        <button onClick={handleClickOnNext}>Next</button>
      </>
    );
  };

  return InquiryFilesUpload;
});

jest.mock('../InquiryFilesWaitTransaction', () => {
  const InquiryFilesWaitTransaction = ({
    inquiryType,
    uploadData,
    onNext,
    onError,
  }: {
    inquiryType: DocumentInquiryType;
    uploadData: WaitingPhasePayload;
    onNext: () => void;
    onError: () => void;
  }) => {
    return (
      <>
        <p>InquiryFilesWaitTransaction</p>
        <button onClick={onError}>Error</button>
        <button onClick={onNext}>Next</button>
      </>
    );
  };

  return InquiryFilesWaitTransaction;
});

describe('DocumentInquiryFiles', () => {
  let result: RenderResult;
  let mockOnConfirm = jest.fn();
  const pageTitle = 'Mock DocumentInquiryFiles';

  beforeEach(() => {
    result = render(
      <DocumentInquiryFiles
        onConfirm={mockOnConfirm}
        inquiryType={DocumentInquiryType.ACT}
        title={pageTitle}
      />
    );
  });

  it('should render InquiryFilesUpload Component', () => {
    const pageTitleElement = result.container.querySelector('h6');
    expect(pageTitleElement).toHaveTextContent(pageTitle);
    expect(result.getByText('InquiryFilesUpload')).toBeInTheDocument();
  });

  it('should allow going to wait transaction phase', async () => {
    const nextButton = result.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(result.getByText('InquiryFilesWaitTransaction')).toBeInTheDocument();
    });
  });

  it('should return to upload phase in case of error', async () => {
    const nextButton = result.getByRole('button', { name: 'Next' });
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(result.getByText('InquiryFilesWaitTransaction')).toBeInTheDocument();
    });

    const errorButton = result.getByRole('button', { name: 'Error' });
    fireEvent.click(errorButton);
    await waitFor(() => {
      expect(result.getByText('InquiryFilesUpload')).toBeInTheDocument();
    });
  });
});
