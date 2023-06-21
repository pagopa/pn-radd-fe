import { fireEvent, waitFor, RenderResult } from '@testing-library/react';

import { render } from '../../../test-utils';
import FileUpload from '../FileUpload';
import { createMockedBlob, createMockedFile, uploadMockedFile } from './test-util';
import { formatBytes } from '../../../utils/file.utils';

const maxFileSize = 2048;

describe('FileUpload Component', () => {
  let result: RenderResult;
  let mockUploadFn: jest.Mock;

  const mockUploadFileHandler = jest.fn();
  const mockRemoveFileHandler = jest.fn();
  const file = new Blob(['mocked content'], { type: 'text/plain' });
  (file as any).name = 'Mocked file';

  async function testFileUploading() {
    const fileInput = result.queryByTestId('file-input-id');
    expect(fileInput).toBeInTheDocument();
    const input = fileInput?.querySelector('input');
    fireEvent.change(input!, { target: { files: [file] } });
    await waitFor(() => {
      expect(mockUploadFn).toBeCalledTimes(1);
      expect(mockUploadFn).toBeCalledWith(file, undefined);
      expect(result.container).toHaveTextContent(/Caricamento/i);
    });
  }

  beforeEach(() => {
    mockUploadFn = jest.fn();
    mockUploadFn.mockImplementation(jest.fn(() => Promise.resolve(null)));
    // render component
    result = render(
      <FileUpload
        id="id"
        uploadText="Mocked upload text"
        accept={['text/plain']}
        maxFileSize={2048}
        uploadFn={mockUploadFn}
        onFileUploaded={mockUploadFileHandler}
        onRemoveFile={mockRemoveFileHandler}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders FileUpload', () => {
    expect(result.container).toHaveTextContent(/Mocked upload text/i);
    const loadFromPc = result.getByTestId('loadFromPc');
    expect(loadFromPc).toBeInTheDocument();
  });

  it('uploads file (correct format)', async () => {
    await testFileUploading();
  });

  it('uploads file (wrong format)', async () => {
    const fileInput = result.queryByTestId('file-input-id');
    expect(fileInput).toBeInTheDocument();
    const input = fileInput?.querySelector('input');
    fireEvent.change(input!, {
      target: { files: [new Blob(['mocked content'], { type: 'application/pdf' })] },
    });
    await waitFor(() => {
      expect(mockUploadFn).not.toBeCalled();
      expect(result.container).toHaveTextContent(/Mocked upload text/i);
      expect(result.container).toHaveTextContent(
        /Estensione file non supportata. Riprovare con un altro file./i
      );
    });
  });

  it('uploads file (error max size)', async () => {
    const fileInput = result.queryByTestId('file-input-id');
    expect(fileInput).toBeInTheDocument();
    const input = fileInput?.querySelector('input');
    let blob = createMockedBlob('text/plain', 3000);
    fireEvent.change(input!, {
      target: { files: [blob] },
    });

    const errorMessage = `Dimensione file non supportata (max ${formatBytes(
      maxFileSize
    )}). Riprovare con un altro file.`;
    await waitFor(() => {
      expect(mockUploadFn).not.toBeCalled();
      expect(result.container).toHaveTextContent(/Mocked upload text/i);
      expect(result.container).toHaveTextContent(errorMessage);
    });
  });

  it('uploads file (error)', async () => {
    mockUploadFn.mockImplementation(jest.fn(() => Promise.reject(null)));
    await testFileUploading();
    await waitFor(() => {
      expect(result.container).toHaveTextContent(
        /Si è verificato un errore durante il caricamento del file. Si prega di riprovare./i
      );
    });
  });

  it('file uploaded', async () => {
    await testFileUploading();
    await waitFor(() => {
      expect(result.container).toHaveTextContent(/Mocked file/i);
      expect(mockUploadFileHandler).toBeCalledTimes(1);
    });
  });

  it('removes file uploaded', async () => {
    await testFileUploading();
    const removeButton = await result.findByTestId('remove-button');
    fireEvent.click(removeButton!);
    await waitFor(() => {
      expect(mockRemoveFileHandler).toBeCalledTimes(1);
      expect(result.container).toHaveTextContent(/Mocked upload text/i);
    });
  });
});
