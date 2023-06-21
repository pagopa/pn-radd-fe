import { DocumentInquiryType } from '../../../../redux/document-inquiry/types';
import { RenderResult, render, waitFor } from '../../../../test-utils';
import InquiryFilesWaitTransaction from '../InquiryFilesWaitTransaction';

jest.setTimeout(10000);

describe('InquiryFilesWaitTransaction', () => {
  let result: RenderResult;
  let mockOnError = jest.fn();
  let mockOnNext = jest.fn();
  beforeEach(() => {
    result = render(
      <InquiryFilesWaitTransaction
        inquiryType={DocumentInquiryType.ACT}
        onError={mockOnError}
        onNext={mockOnNext}
        uploadData={{ checksum: 'test', bundleId: 'test', zip: new File([], 'test.zip') }}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render waiting page until transaction is opened', async () => {
    const title = result.getByText('Stiamo caricando i documenti');
    expect(title).toBeInTheDocument();

    await waitFor(
      () => {
        expect(mockOnNext).toBeCalled();
      },
      { timeout: 7000 }
    );
  });
});
