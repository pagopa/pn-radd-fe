import { fireEvent, render } from '../../../../test-utils';
import AttachmentDownloader from '../AttachmentDownloader';

describe('AttachmentDownloader', () => {
  const onDownloadMock = jest.fn();

  it('should render downloadable element', () => {
    const fileName = 'File test';
    const result = render(
      <AttachmentDownloader
        clicked={false}
        fileName={fileName}
        onDownload={onDownloadMock}
        fileUrl="test"
      />
    );
    expect(result.getByText(fileName)).toBeInTheDocument();
    expect(result.getByTestId('download-link')).toBeInTheDocument();
  });

  it('click on download link', () => {
    const fileName = 'File test';
    const result = render(
      <AttachmentDownloader
        clicked={false}
        fileName={fileName}
        onDownload={onDownloadMock}
        fileUrl="test"
      />
    );
    const link = result.getByTestId('download-link');
    expect(result.getByText(fileName)).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    fireEvent.click(link);

    expect(onDownloadMock).toBeCalled();
  });

  it('should render downloaded element', () => {
    const fileName = 'File test';
    const result = render(
      <AttachmentDownloader
        clicked={true}
        fileName={fileName}
        onDownload={onDownloadMock}
        fileUrl="test"
      />
    );
    expect(result.getByText(fileName)).toBeInTheDocument();
    expect(result.getByTestId('done-download')).toBeInTheDocument();
  });
});
