import { RenderResult, fireEvent, render, waitFor } from '../../../../test-utils';
import { createMockedFile, uploadMockedFile } from '../../../FileUpload/__test__/test-util';
import InquiryFilesUpload from '../InquiryFilesUpload';

let file = createMockedFile('test-img', 'image/png');

let mockFolder: jest.Mock;
let mockFile: jest.Mock;

jest.mock('../../../../utils/file.utils', () => ({
  ...jest.requireActual('../../../../utils/file.utils'),
  calcSha256String: () => Promise.resolve({ hashHex: 'hashex', hashBase64: 'hashbase64' }),
}));

function mockJszip() {
  mockFolder = mockFolder ?? jest.fn(mockJszip);
  mockFile = mockFile ?? jest.fn(mockJszip);
  return {
    folder: mockFolder,
    file: mockFile,
    generateAsync: jest.fn().mockImplementation(() => {
      return new Promise((res) => res(file));
    }),
  };
}

jest.mock('jszip', () => {
  return {
    __esModule: true,
    default: mockJszip,
  };
});

describe('InquiryFilesUpload', () => {
  let result: RenderResult;
  let mockOnNext = jest.fn();
  let mockOnRemove = jest.fn();
  let mockOnUpload = jest.fn();

  window.URL.createObjectURL = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render 1 FileUpload Component', () => {
    result = render(
      <InquiryFilesUpload
        files={{ 'recipient-id': undefined }}
        isDelegatePresent={false}
        onNext={mockOnNext}
        onRemove={mockOnRemove}
        onUpload={mockOnUpload}
      />
    );

    expect(result.getByText('Documento di riconoscimento del destinatario*')).toBeInTheDocument();
    expect(result.queryByText('Documento di riconoscimento del delegato*')).not.toBeInTheDocument();
    expect(result.queryByText('Modulo di delega*')).not.toBeInTheDocument();

    const confirmButton = result.getByRole('button', { name: 'Continua' });
    expect(confirmButton).toBeDisabled();
  });

  it('should allow uploading recipient id document', async () => {
    result = render(
      <InquiryFilesUpload
        files={{ 'recipient-id': undefined }}
        isDelegatePresent={false}
        onNext={mockOnNext}
        onRemove={mockOnRemove}
        onUpload={mockOnUpload}
      />
    );

    expect(result.getByText('Documento di riconoscimento del destinatario*')).toBeInTheDocument();

    await uploadMockedFile(result, 'recipient-id', file);
    await waitFor(() => {
      expect(mockOnUpload).toBeCalled();
    });
  });

  it('should enable confirm button when user uploads recipient id document', async () => {
    result = render(
      <InquiryFilesUpload
        files={{ 'recipient-id': file }}
        isDelegatePresent={false}
        onNext={mockOnNext}
        onRemove={mockOnRemove}
        onUpload={mockOnUpload}
      />
    );

    await waitFor(() => {
      const confirmButton = result.getByRole('button', { name: 'Continua' });
      expect(confirmButton).not.toBeDisabled();
    });
  });

  it('should render 3 FileUpload Components', () => {
    result = render(
      <InquiryFilesUpload
        files={{ 'recipient-id': undefined, 'delegate-id': undefined, 'delegate-act': undefined }}
        isDelegatePresent={true}
        onNext={mockOnNext}
        onRemove={mockOnRemove}
        onUpload={mockOnUpload}
      />
    );

    expect(result.getByText('Documento di riconoscimento del destinatario*')).toBeInTheDocument();
    expect(result.queryByText('Documento di riconoscimento del delegato*')).toBeInTheDocument();
    expect(result.queryByText('Modulo di delega*')).toBeInTheDocument();

    const confirmButton = result.getByRole('button', { name: 'Continua' });
    expect(confirmButton).toBeDisabled();
  });

  it('should allow uploading recipient id, delegate id and delegate act documents', async () => {
    result = render(
      <InquiryFilesUpload
        files={{ 'recipient-id': undefined, 'delegate-id': undefined, 'delegate-act': undefined }}
        isDelegatePresent={true}
        onNext={mockOnNext}
        onRemove={mockOnRemove}
        onUpload={mockOnUpload}
      />
    );

    expect(result.getByText('Documento di riconoscimento del destinatario*')).toBeInTheDocument();
    expect(result.queryByText('Documento di riconoscimento del delegato*')).toBeInTheDocument();
    expect(result.queryByText('Modulo di delega*')).toBeInTheDocument();

    await uploadMockedFile(result, 'recipient-id', file);
    await uploadMockedFile(result, 'delegate-id', file);
    await uploadMockedFile(result, 'delegate-act', file);

    await waitFor(() => {
      expect(mockOnUpload).toBeCalledTimes(3);
    });
  });

  it('should enable confirm button when user uploads all required document', async () => {
    result = render(
      <InquiryFilesUpload
        files={{ 'recipient-id': file, 'delegate-id': file, 'delegate-act': file }}
        isDelegatePresent={false}
        onNext={mockOnNext}
        onRemove={mockOnRemove}
        onUpload={mockOnUpload}
      />
    );

    await waitFor(() => {
      const confirmButton = result.getByRole('button', { name: 'Continua' });
      expect(confirmButton).not.toBeDisabled();
    });
  });

  it('should go to next step after upload', async () => {
    result = render(
      <InquiryFilesUpload
        files={{ 'recipient-id': file }}
        isDelegatePresent={false}
        onNext={mockOnNext}
        onRemove={mockOnRemove}
        onUpload={mockOnUpload}
      />
    );

    const confirmButton = result.getByRole('button', { name: 'Continua' });
    expect(confirmButton).not.toBeDisabled();
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockOnNext).toBeCalled();
    });
  });
});
