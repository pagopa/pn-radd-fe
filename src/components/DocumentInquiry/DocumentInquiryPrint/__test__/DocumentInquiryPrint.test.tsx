import { DocumentInquiryType } from '../../../../redux/document-inquiry/types';
import {
  RenderResult,
  defaultPreloadedState,
  fireEvent,
  render,
  renderWithRouter,
  waitFor,
} from '../../../../test-utils';
import DocumentInquiryPrint from '../DocumentInquiryPrint';

describe('DocumentInquiryPrint', () => {
  let result: RenderResult;
  let onConfirmMock = jest.fn();

  beforeEach(() => {
    jest.mock('react-router', () => ({
      ...jest.requireActual('react-router'),
      useBlocker: (shouldBlock: boolean) => ({
        state: 'unblocked',
        location: 'test',
        proceed: undefined,
        reset: undefined,
      }),
    }));

    result = renderWithRouter(
      <DocumentInquiryPrint
        inquiryType={DocumentInquiryType.ACT}
        onConfirm={onConfirmMock}
        title="test"
      />,
      { preloadedState: mockedStore }
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockedStore = {
    ...defaultPreloadedState,
    documentInquiry: {
      ...defaultPreloadedState.documentInquiry,
      transactionData: {
        operationId: 'test',
        urlList: ['http://test.it', 'http://test2.it'],
      },
    },
  };

  it('should render with downloadable files', () => {
    const links = result.getAllByTestId('download-link');
    expect(links).toHaveLength(2);
    const confirmButton = result.getByRole('button', { name: 'Ho finito' });
    expect(confirmButton).toBeDisabled();
  });

  it('should enable confirm button when the user downloads all the files', async () => {
    const links = result.getAllByTestId('download-link');
    expect(links).toHaveLength(mockedStore.documentInquiry.transactionData.urlList.length);

    fireEvent.click(links[0]);
    await waitFor(() => {
      expect(result.getByTestId('done-download')).toBeInTheDocument();
    });
    fireEvent.click(links[1]);
    await waitFor(() => {
      expect(result.getAllByTestId('done-download')).toHaveLength(2);
    });

    const confirmButton = result.getByRole('button', { name: 'Ho finito' });
    expect(confirmButton).not.toBeDisabled();

    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(onConfirmMock).toBeCalled();
    });
  });
});
